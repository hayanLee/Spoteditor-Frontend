import { notificationKeys } from '@/hooks/queries/notification/notificationQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { NotificationResponse } from '@/services/apis/types/notificationAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useReadAllNotification() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: () => api.notification.putNotiAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.all });

      const notificationPrevious = queryClient.getQueryData(notificationKeys.all);

      queryClient.setQueryData(notificationKeys.all, (oldData: NotificationResponse) => {
        return {
          ...oldData,
          content: [],
        };
      });

      return { notificationPrevious };
    },

    onError(_, __, context: any) {
      queryClient.setQueryData(notificationKeys.all, context.notificationPrevious);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
