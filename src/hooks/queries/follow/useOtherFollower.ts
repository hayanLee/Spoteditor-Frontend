import { FollowQueryParams } from '@/services/apis/types/followAPI';
import { useInfiniteQuery } from '@tanstack/react-query';
import { followKeys } from './followQueryKeys';
import api from '@/services/apis/api';

export default function useOtherFollower(
  isMe: boolean,
  userId: number,
  { page = 1, size = 10, direction = 'ASC' }: Partial<FollowQueryParams> = {}
) {
  return useInfiniteQuery({
    queryKey: followKeys.userFollowerList(userId, { page, size, direction }),
    queryFn: ({ pageParam }) =>
      api.follow.getOtherFollower({ userId, params: { ...pageParam, size, direction } }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= lastPage.totalPages ? { page: nextPage } : null;
    },
    enabled: !isMe,
  });
}

/* export default function useFollower(
  userId: number,
  { page = 1, size = 10, direction = 'ASC' }: Partial<FollowQueryParams> = {},
  queryOptions?: Partial<UseQueryOptions<FollowResponse, Error>>
) {
  return useQuery<FollowResponse, Error>({
    queryKey: followKeys.userFollowerList(userId, { page, size, direction }),
    queryFn: () => api.follow.getFollower({ userId, params: { page, size, direction } }),
    ...queryOptions,
  });
} */
