import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../user/useAuth';
import { logKeys } from './logQueryKeys';

const useLogBookMark = (placeLogId: number) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: [...logKeys.logBookMark(placeLogId)],
    queryFn: () => api.log.getLogBookMark(placeLogId),
    enabled: !!user,
  });
};

export default useLogBookMark;
