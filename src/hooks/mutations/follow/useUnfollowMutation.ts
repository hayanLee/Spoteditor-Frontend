import { followKeys } from '@/hooks/queries/follow/followQueryKeys';
import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { FollowResponse } from '@/services/apis/types/followAPI';
import { LogResponse } from '@/services/apis/types/registerAPI.type';
import { IUser } from '@/services/apis/types/userAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

export function useUnfollowMutation() {
  const { pathname } = useLocation();
  const { placeLogId } = useParams();

  /* 프로필페이지에서 팔로잉할 경우에만 낙관적 팔로잉 리스트 낙관적 업데이트 */
  const profilePage = pathname.startsWith('/profile');
  /* 상세페이지에서 팔로잉할 경우에만 낙관적 단일로그 낙관적 업데이트 */
  const detailPage = pathname.startsWith('/log');

  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId) => api.follow.deleteFollow(userId),
    onMutate: async (userId) => {
      if (profilePage && userId) {
        await queryClient.cancelQueries({ queryKey: followKeys.userFollowings(userId) });
      }
      await queryClient.cancelQueries({ queryKey: userKeys.me() });
      if (detailPage && placeLogId) {
        await queryClient.cancelQueries({ queryKey: logKeys.detail(Number(placeLogId)) });
      }

      const previousFolloings = profilePage
        ? queryClient.getQueryData(followKeys.userFollowings(userId))
        : undefined;
      const otherUserPrevious = queryClient.getQueryData(userKeys.me());
      const logPrevious = detailPage
        ? queryClient.getQueryData(logKeys.detail(Number(placeLogId)))
        : undefined;

      if (profilePage && userId) {
        queryClient.setQueryData(followKeys.userFollowings(userId), (oldData: FollowResponse) => {
          const fillterData = oldData?.content?.filter((user) => user.userId !== userId);
          return {
            ...oldData,
            content: fillterData ?? [],
          };
        });
      }
      queryClient.setQueryData(userKeys.me(), (oldData: IUser) => {
        return {
          ...oldData,
          following: oldData?.following - 1,
        };
      });
      if (detailPage && placeLogId) {
        queryClient.setQueryData(logKeys.detail(Number(placeLogId)), (oldData: LogResponse) => {
          const currentIsFollowing = oldData.isFollowing;
          return {
            ...oldData,
            isFollowing: !currentIsFollowing,
          };
        });
      }
      return { previousFolloings, otherUserPrevious, logPrevious };
    },

    onError(_, userId, context: any) {
      if (profilePage && userId) {
        queryClient.setQueryData(followKeys.userFollowings(userId), context.previousFolloings);
      }
      queryClient.setQueryData(userKeys.me(), context.otherUserPrevious);
      if (detailPage && context.logPrevious) {
        queryClient.setQueryData(logKeys.detail(Number(placeLogId)), context.logPrevious);
      }
    },

    onSuccess: (_, userId) => {
      if (profilePage && userId) {
        queryClient.invalidateQueries({ queryKey: followKeys.userFollowings(userId) });
      }
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      if (detailPage && placeLogId) {
        queryClient.invalidateQueries({ queryKey: logKeys.detail(Number(placeLogId)) });
      }
    },
  });
}
