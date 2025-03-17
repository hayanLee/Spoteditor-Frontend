import { SearchLogResponse, SearchLogsAddressQueryParams } from '@/services/apis/types/searchLog';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import searchLogKeys from './searchLogKeys';
import api from '@/services/apis/api';

export default function useSearchAddresLog(
  {
    page = 1,
    size = 12,
    direction = 'ASC',
    sido = '서울',
    bname = '송파구',
  }: Partial<SearchLogsAddressQueryParams> = {},
  queryOptions?: Partial<UseQueryOptions<SearchLogResponse, Error>>
) {
  return useQuery<SearchLogResponse, Error>({
    queryKey: searchLogKeys.address({ page, size, direction, sido, bname }),
    queryFn: () => api.searchLog.getSearchAddresLogs({ page, size, direction, sido, bname }),
    ...queryOptions,
  });
}
