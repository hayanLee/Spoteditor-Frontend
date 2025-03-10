import { useInfiniteQuery } from '@tanstack/react-query';
import { followKeys } from './followQueryKeys';
import { FollowQueryParams } from '@/services/apis/types/followAPI';
import api from '@/services/apis/api';

export default function useFollowing(
  isMe: boolean,
  { page = 1, size = 10, direction = 'ASC' }: Partial<FollowQueryParams> = {}
) {
  return useInfiniteQuery({
    queryKey: followKeys.followingList({ page, size, direction }),
    queryFn: ({ pageParam }) => api.follow.getFollowing({ ...pageParam, size, direction }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= lastPage.totalPages ? { page: nextPage } : null;
    },
    enabled: isMe,
  });
}
