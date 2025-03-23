import { LogsQueryParams } from '@/services/apis/types/logAPI.type';

export const logKeys = {
  all: ['log', 'user'] as const,
  list: (params?: LogsQueryParams) => [...logKeys.all, 'list', params] as const,
  detail: (placeLogId: number) => [...logKeys.all, 'detail', placeLogId] as const,
  bookMark: (placeLogId: number) => [...logKeys.detail(placeLogId), 'bookmark', 'place'] as const,
  logBookMark: (placeLogId: number) => [...logKeys.detail(placeLogId), 'bookmark', 'log'] as const,
  placeBookMarkCheck: (placeId: number) => [...logKeys.all, 'bookmark', 'check', placeId] as const,
};
