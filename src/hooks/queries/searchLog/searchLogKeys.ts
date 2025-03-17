import { SearchLogsAddressQueryParams, SearchLogsNameQueryParams } from "@/services/apis/types/searchLog";

export const searchLogKeys = {
    //각각 검색 조건에 따라 다른 캐싱을 위한 쿼리키 추가
    all: ['searchLogs'] as const,
  
    names: () => [...searchLogKeys.all, 'names'] as const,
    name: (params: SearchLogsNameQueryParams) => [...searchLogKeys.names(), params] as const,
  
    addresses: () => [...searchLogKeys.all, 'addresses'] as const,
    address: (params: SearchLogsAddressQueryParams) => [...searchLogKeys.addresses(), params] as const,
  };
  
  export default searchLogKeys;
  