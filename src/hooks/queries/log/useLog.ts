import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const useLog = (placeLogId: number) => {
  return useQuery({
    queryKey: logKeys.detail(placeLogId),
    queryFn: () => api.log.getLog(placeLogId),
  });
};

export default useLog;
