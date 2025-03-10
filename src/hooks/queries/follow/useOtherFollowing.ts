import { FollowQueryParams } from '@/services/apis/types/followAPI';
import { useInfiniteQuery } from '@tanstack/react-query';
import { followKeys } from './followQueryKeys';
import api from '@/services/apis/api';

export default function useOtherFollowing(
  isMe: boolean,
  userId: number,
  { page = 1, size = 10, direction = 'ASC' }: Partial<FollowQueryParams> = {}
) {
  return useInfiniteQuery({
    queryKey: followKeys.userFollowingList(userId, { page, size, direction }),
    queryFn: ({ pageParam }) =>
      api.follow.getOtherFollowing({ userId, params: { ...pageParam, size, direction } }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= lastPage.totalPages ? { page: nextPage } : null;
    },
    enabled: !isMe,
  });
}
