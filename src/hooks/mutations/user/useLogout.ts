import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import { logoutAuth } from '@/services/apis/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAuth,
    onSuccess() {
      queryClient.removeQueries({ queryKey: userKeys.me() });
      queryClient.removeQueries({ queryKey: userKeys.auth() });
      queryClient.removeQueries({ queryKey: logKeys.all });
      nav('/', { replace: true });
    },
    onError(err) {
      console.error('로그아웃 실패:', err);
    },
  });
}
