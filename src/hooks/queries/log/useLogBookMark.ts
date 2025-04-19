import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import useUser from '../user/useUser';
import { logKeys } from './logQueryKeys';

const useLogBookMark = (placeLogId: number) => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: [...logKeys.logBookMark(placeLogId)],
    queryFn: () => api.log.getLogBookMark(placeLogId),
    enabled: !!user,
  });
};

export default useLogBookMark;
