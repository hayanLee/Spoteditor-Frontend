import { LogsQueryParams } from '@/services/apis/types/logAPI.type';

export const logKeys = {
  all: ['log'] as const,
  list: (params?: LogsQueryParams) => [...logKeys.all, 'list', params] as const,
  detail: (placeLogId: number) => [...logKeys.all, 'detail', placeLogId] as const,
  bookMark: (placeLogId: number) => [...logKeys.detail(placeLogId), 'bookmark', 'place'] as const, // 로그 내 장소 북마크
  logBookMark: (placeLogId: number) => [...logKeys.detail(placeLogId), 'bookmark'] as const, // 로그 북마크 여부
};
