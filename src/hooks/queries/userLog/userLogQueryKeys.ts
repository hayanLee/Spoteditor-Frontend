import { LogsQueryParams } from '@/services/apis/types/logAPI.type';

export const userLogsKeys = {
  all: ['userLogs'] as const,

  logs: () => [...userLogsKeys.all, 'logs'] as const,
  logList: (params: LogsQueryParams) => [...userLogsKeys.logs(), { params }] as const,

  bookmarkPlaces: () => [...userLogsKeys.all, 'bookmarkPlaces'] as const,
  bookmarkPlaceList: (params: LogsQueryParams) =>
    [...userLogsKeys.bookmarkPlaces(), { params }] as const,

  bookmarkLogs: () => [...userLogsKeys.all, 'bookmarkLogs'] as const,
  bookmarkLogList: (params: LogsQueryParams) =>
    [...userLogsKeys.bookmarkLogs(), { params }] as const,

  otherUser: (userId: number) => [...userLogsKeys.all, 'otherUser', userId] as const,

  otherUserLogs: (userId: number) => [...userLogsKeys.otherUser(userId), 'logs'] as const,
  otherUserLogList: (userId: number, params: LogsQueryParams) =>
    [...userLogsKeys.otherUserLogs(userId), { params }] as const,

  otherUserBookmarkPlaces: (userId: number) =>
    [...userLogsKeys.otherUser(userId), 'bookmarkPlaces'] as const,
  otherUserBookmarkPlaceList: (userId: number, params: LogsQueryParams) =>
    [...userLogsKeys.otherUserBookmarkPlaces(userId), { params }] as const,

  otherUserBookmarkLogs: (userId: number) =>
    [...userLogsKeys.otherUser(userId), 'bookmarkLogs'] as const,
  otherUserBookmarkLogList: (userId: number, params: LogsQueryParams) =>
    [...userLogsKeys.otherUserBookmarkLogs(userId), { params }] as const,
};
