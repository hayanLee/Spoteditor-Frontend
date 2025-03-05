import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import { logoutAuth } from '@/services/apis/authApi';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAuth,
    onSuccess() {
      queryClient.removeQueries({ queryKey: userKeys.all });
      nav('/', { replace: true });
    },
    onError(err) {
      console.error('로그아웃 실패:', err);
    },
  });
}
