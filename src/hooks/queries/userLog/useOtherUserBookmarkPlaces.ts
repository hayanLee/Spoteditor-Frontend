import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UserBookmarkPlaces } from '@/services/apis/types/userLogAPI';

export default function useOtherUserBookmarkPlaces(
  userId: number,
  { page = 1, size = 12, direction = 'ASC' }: Partial<LogsQueryParams> = {},
  queryOptions?: Partial<UseQueryOptions<UserBookmarkPlaces, Error>>
) {
  return useQuery({
    queryKey: userLogsKeys.otherUserBookmarkPlaceList(userId, { page, size, direction }),
    queryFn: () =>
      api.userLog.getOtherUserBookmarkPlaces({ userId, params: { page, size, direction } }),
    ...queryOptions,
  });
}
