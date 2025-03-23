import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { IOhterUser, IUser } from '@/services/apis/types/userAPI';
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
      if (profilePage || detailPage) {
        await queryClient.cancelQueries({ queryKey: userKeys.otherUser(userId) });
      }
      await queryClient.cancelQueries({ queryKey: userKeys.me() });

      const previousFolloings =
        profilePage || detailPage
          ? queryClient.getQueryData(userKeys.otherUser(userId))
          : undefined;
      const otherUserPrevious = queryClient.getQueryData(userKeys.me());

      if (profilePage || detailPage) {
        queryClient.setQueryData(userKeys.otherUser(userId), (oldData: IOhterUser) => {
          return {
            ...oldData,
            isFollowing: false,
          };
        });
      }
      queryClient.setQueryData(userKeys.me(), (oldData: IUser) => {
        return {
          ...oldData,
          following: oldData?.following - 1,
        };
      });
      return { previousFolloings, otherUserPrevious };
    },

    onError(_, userId, context: any) {
      if (profilePage || detailPage) {
        queryClient.setQueryData(userKeys.otherUser(userId), context.previousFolloings);
      }
      queryClient.setQueryData(userKeys.me(), context.otherUserPrevious);
      if (detailPage && context.logPrevious) {
        queryClient.setQueryData(logKeys.detail(Number(placeLogId)), context.logPrevious);
      }
    },

    onSuccess: (_, userId) => {
      if (profilePage || detailPage) {
        queryClient.invalidateQueries({ queryKey: userKeys.otherUser(userId) });
      }
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
