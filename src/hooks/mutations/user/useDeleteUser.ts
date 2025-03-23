import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.user.deleteUser(),
    onSuccess() {
      queryClient.removeQueries({ queryKey: userKeys.me() });
      queryClient.removeQueries({ queryKey: userKeys.auth() });
    },
    onError(err) {
      console.error('유저 정보 삭제 실패:', err);
    },
  });
}
