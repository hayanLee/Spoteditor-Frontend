import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';

export default function useUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => api.user.getUser(),
    staleTime: Infinity,
  });
}
