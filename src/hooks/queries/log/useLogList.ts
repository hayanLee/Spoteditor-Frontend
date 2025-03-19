import api from '@/services/apis/api';
import { LogContents, LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const useLogList = (params?: LogsQueryParams) => {
  const defaultParams: LogsQueryParams = {
    page: 1,
    size: 13,
    direction: 'ASC',
  };

  const finalParams = {
    ...defaultParams,
    ...params,
  };

  return useQuery<LogContents>({
    queryKey: logKeys.list(finalParams),
    queryFn: () => api.log.getLogs(finalParams),
    placeholderData: keepPreviousData,
  });
};

export default useLogList;
