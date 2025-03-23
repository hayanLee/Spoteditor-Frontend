import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { Address } from 'cluster';
import { Image } from '@/services/apis/types/registerAPI.type';
import { IOhterUser, IUser } from '@/services/apis/types/userAPI';

export interface PlaceInLog {
  placeId: number;
  userId: number;
  userName: string;
  userImage: string;
  name: string;
  description: string;
  address: Address;
  category: string;
  images: Image[];
}

export function useFollowingMutation() {
  const { pathname } = useLocation();

  /* 프로필페이지에서 팔로잉할 경우에만 낙관적 팔로잉 리스트 낙관적 업데이트 */
  const profilePage = pathname.startsWith('/profile');
  /* 상세페이지에서 팔로잉할 경우에만 낙관적 단일로그 낙관적 업데이트 */
  const detailPage = pathname.startsWith('/log');

  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId: number) => api.follow.postFollow(userId),
    onMutate: async (userId) => {
      if (profilePage || detailPage) {
        await queryClient.cancelQueries({ queryKey: userKeys.otherUser(userId) });
      }
      await queryClient.cancelQueries({ queryKey: userKeys.me() });

      const previousFolloings =
        profilePage || detailPage
          ? queryClient.getQueryData(userKeys.otherUser(userId))
          : undefined;
      const userPrevious = queryClient.getQueryData(userKeys.me());

      if (profilePage || detailPage) {
        queryClient.setQueryData(userKeys.otherUser(userId), (oldData: IOhterUser) => {
          return {
            ...oldData,
            isFollowing: true,
          };
        });
      }
      queryClient.setQueryData(userKeys.me(), (oldData: IUser) => {
        return {
          ...oldData,
          following: oldData?.following + 1,
        };
      });
      return { previousFolloings, userPrevious };
    },

    onError(_, userId, context: any) {
      if (profilePage || detailPage) {
        queryClient.setQueryData(userKeys.otherUser(userId), context.previousFolloings);
      }
      queryClient.setQueryData(userKeys.me(), context.userPrevious);
    },

    onSuccess: (_, userId) => {
      if (profilePage || detailPage) {
        queryClient.invalidateQueries({ queryKey: userKeys.otherUser(userId) });
      }
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
