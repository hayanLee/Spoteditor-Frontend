import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import { followKeys } from '@/hooks/queries/follow/followQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { FollowResponse } from '@/services/apis/types/followAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IOhterUser } from '@/services/apis/types/userAPI';

interface UseFollowMutationProps {
  otherUserName: string;
  otherUserImage: string;
}

export function useFollowingMutation({ otherUserName, otherUserImage }: UseFollowMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId: number) => api.follow.postFollow(userId),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.userFollowings(userId) });
      await queryClient.cancelQueries({ queryKey: userKeys.otherUser(userId) });

      const followingPreviousFollowers = queryClient.getQueryData(
        followKeys.userFollowings(userId)
      );
      const otherUserPrevious = queryClient.getQueryData(userKeys.otherUser(userId));

      queryClient.setQueryData(followKeys.userFollowings(userId), (oldData: FollowResponse) => {
        return {
          ...oldData,
          content: [
            ...(oldData?.content ?? []),
            { userId, name: otherUserName, imageUrl: otherUserImage },
          ],
        };
      });
      queryClient.setQueryData(userKeys.otherUser(userId), (oldData: IOhterUser) => {
        const currentIsFollowing = oldData.isFollowing;
        return {
          ...oldData,
          isFollowing: !currentIsFollowing,
        };
      });

      return { followingPreviousFollowers, otherUserPrevious };
    },

    onError(_, userId, context: any) {
      queryClient.setQueryData(
        followKeys.userFollowings(userId),
        context.followingPreviousFollowers
      );
      queryClient.setQueryData(userKeys.otherUser(userId), context.otherUserPrevious);
    },

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: followKeys.userFollowings(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.otherUser(userId) });
    },
  });
}
