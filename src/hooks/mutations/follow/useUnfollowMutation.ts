import { followKeys } from '@/hooks/queries/follow/followQueryKeys';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { FollowResponse } from '@/services/apis/types/followAPI';
import { IOhterUser } from '@/services/apis/types/userAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUnfollowMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId) => api.follow.deleteFollow(userId),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.userFollowings(userId) });
      await queryClient.cancelQueries({ queryKey: userKeys.otherUser(userId) });

      const previousFollowers = queryClient.getQueryData(followKeys.userFollowings(userId));
      const otherUserPrevious = queryClient.getQueryData(userKeys.otherUser(userId));

      queryClient.setQueryData(followKeys.userFollowings(userId), (oldData: FollowResponse) => {
        const fillterData = oldData?.content?.filter((user) => user.userId !== userId);
        return {
          ...oldData,
          content: fillterData ?? [],
        };
      });
      queryClient.setQueryData(userKeys.otherUser(userId), (oldData: IOhterUser) => {
        const currentIsFollowing = oldData.isFollowing;
        return {
          ...oldData,
          isFollowing: !currentIsFollowing,
        };
      });
      return { previousFollowers, otherUserPrevious };
    },

    onError(_, userId, context: any) {
      queryClient.setQueryData(followKeys.userFollowings(userId), context.previousFollowers);
      queryClient.setQueryData(userKeys.otherUser(userId), context.otherUserPrevious);
    },

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: followKeys.userFollowings(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.otherUser(userId) });
    },
  });
}
