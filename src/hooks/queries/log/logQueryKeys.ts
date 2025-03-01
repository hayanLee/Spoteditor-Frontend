import { LogsQueryParams } from '@/services/apis/types/logAPI.type';

export const logKeys = {
  all: ['log'] as const,
  list: (params?: LogsQueryParams) => [...logKeys.all, 'list', params] as const,
  detail: (placeLogId: number) => [...logKeys.all, 'detail', placeLogId] as const,
};
