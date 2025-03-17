import { PageNation } from './commonApi';
import { LogContent } from './logAPI.type';
import { LogsQueryParams } from '@/services/apis/types/logAPI.type';

export interface SearchLogsNameQueryParams extends LogsQueryParams {
  name: string;
}

export interface SearchLogsAddressQueryParams extends LogsQueryParams {
  sido: string;
  bname: string;
}

export type SearchLogResponse = PageNation<LogContent[]>;
