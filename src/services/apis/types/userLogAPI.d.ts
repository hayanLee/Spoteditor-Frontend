import { LogContent, LogsQueryParams } from './logAPI.type';
import { Address, Image } from './registerAPI.type';
/* 타유저 api 파라미터 */
export interface IOtherUserParams {
  userId: number;
  params: LogsQueryParams;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Place {
  placeId: number;
  author: string;
  name: string;
  description: string;
  address: Address;
  category: string;
  image: Image;
}

interface PlaceLog {
  placeLogId: number;
  name: string;
  image: Image;
  address: Address;
  views: number;
}

/* 유저 로그리스트 응답*/
export interface UserLogs {
  content: LogContent[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: SortInfo;
}

/* 유저 북마크 장소 응답*/
export interface UserBookmarkPlaces {
  content: Place[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: SortInfo;
}

/* 유저 북마크 로그리스트 응답 */
export interface UserBookmarkLogs {
  content: PlaceLog[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: SortInfo;
}
