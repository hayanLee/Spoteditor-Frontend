import { authUserApi } from '@/services/apis/userApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authUserApi.deleteUser(),
    onSuccess() {
      queryClient.removeQueries({ queryKey: userKeys.all });
    },
    onError(err) {
      console.error('유저 정보 삭제 실패:', err);
    },
  });
}
