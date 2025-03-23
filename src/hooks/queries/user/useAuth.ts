import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from './userQueryKeys';

const useAuth = () => {
  return useQuery({
    queryKey: userKeys.auth(),
    queryFn: () => api.user.getUser(),
    retry: 1,
    staleTime: Infinity,
  });
};

export default useAuth;
