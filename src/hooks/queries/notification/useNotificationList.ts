import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { notificationKeys } from './notificationQueryKeys';
import api from '@/services/apis/api';
import {  NotificationResponse } from '@/services/apis/types/notificationAPI';

export default function useNotificationList(
  queryOptions?: Partial<UseQueryOptions<NotificationResponse, Error>>
) {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => api.notification.getNotificationList(),
    ...queryOptions,
  });
}
