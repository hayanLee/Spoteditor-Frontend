import api from '@/services/apis/api';
import { LogResponse } from '@/services/apis/types/registerAPI.type';
import { useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const useLog = (placeLogId: number) => {
  return useQuery<LogResponse>({
    queryKey: logKeys.detail(placeLogId),
    queryFn: () => api.log.getLog(placeLogId),
  });
};

export default useLog;
