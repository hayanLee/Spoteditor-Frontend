import { IUpdateUser } from '@/services/apis/types/userAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateUser) => api.user.patchUser(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      queryClient.invalidateQueries({ queryKey: userKeys.auth() });
      queryClient.refetchQueries({ queryKey: userKeys.me() });
      queryClient.refetchQueries({ queryKey: userKeys.auth() });
      console.log('프로필 업데이트 성공');
    },
    onError(err) {
      console.error('프로필 업데이트 실패:', err);
    },
  });
}
