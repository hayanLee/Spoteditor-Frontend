import { useInfiniteQuery } from '@tanstack/react-query';
import { followKeys } from './followQueryKeys';
import { FollowQueryParams } from '@/services/apis/types/followAPI';
import api from '@/services/apis/api';

export default function useFollower(
  isMe: boolean,
  { page = 1, size = 10, direction = 'ASC' }: Partial<FollowQueryParams> = {}
) {
  return useInfiniteQuery({
    queryKey: followKeys.followerList({ page, size, direction }),
    queryFn: ({ pageParam }) => api.follow.getFollower({ ...pageParam, size, direction }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= lastPage.totalPages ? { page: nextPage } : null;
    },
    enabled: isMe,
  });
}
