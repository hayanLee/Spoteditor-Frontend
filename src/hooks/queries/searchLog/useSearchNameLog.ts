import { SearchLogResponse, SearchLogsNameQueryParams } from "@/services/apis/types/searchLog";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import searchLogKeys from "./searchLogKeys";
import api from "@/services/apis/api";

export default function useSearchNameLog(
    { page = 1, size = 12, direction = 'ASC', name='' }: Partial<SearchLogsNameQueryParams> = {},
    queryOptions?: Partial<UseQueryOptions<SearchLogResponse, Error>>
  ) {
    return useQuery<SearchLogResponse, Error>({
      queryKey: searchLogKeys.name({page, size, direction, name}),
      queryFn: () => api.searchLog.getSearchNameLogs({page, size, direction, name}),
      ...queryOptions,
    });
  }