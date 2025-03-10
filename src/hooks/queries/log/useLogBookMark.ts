import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const useLogBookMark = (placeLogId: number) => {
  return useQuery({
    queryKey: [...logKeys.logBookMark(placeLogId)],
    queryFn: () => api.log.getLogBookMark(placeLogId),
  });
};

export default useLogBookMark;
