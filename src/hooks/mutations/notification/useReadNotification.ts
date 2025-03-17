import { notificationKeys } from '@/hooks/queries/notification/notificationQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { NotificationResponse } from '@/services/apis/types/notificationAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (notiId) => api.notification.putNotiRead(notiId),
    onMutate: async (notiId) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.list() });

      const notificationPrevious = queryClient.getQueryData(notificationKeys.list());

      queryClient.setQueryData(notificationKeys.list(), (oldData: NotificationResponse) => {
        const filterNoti = oldData.filter((noti) => noti.id !== notiId)
        return {
          ...oldData,
          content: filterNoti,
        };
      });

      return { notificationPrevious };
    },

    onError(_, __, context: any) {
      queryClient.setQueryData(notificationKeys.list(), context.notificationPrevious);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}
