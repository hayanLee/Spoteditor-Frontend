import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { notificationKeys } from './notificationQueryKeys';
import api from '@/services/apis/api';
import { NotificationResponse } from '@/services/apis/types/notificationAPI';

export default function useNotificationList(
  queryOptions?: Partial<UseQueryOptions<NotificationResponse, Error>>
) {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => api.notification.getNotificationList(),
    ...queryOptions,
  });
}

/* 페이지네이션 적용 후 교체할 알림 */
/*     export default function useNotificationList({
      size = 10,
      direction = 'ASC',
    }: Partial<NotificationQueryParams> = {}) {
      return useInfiniteQuery({
        queryKey: notificationKeys.list(),
        queryFn: ({ pageParam }) =>
          api.notification.getNotificationList({ ...pageParam, size, direction }),
        initialPageParam: { page: 1 },
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.pageNumber + 1;
          return nextPage <= lastPage.totalPages ? { page: nextPage } : null;
        },
      });
    } */
