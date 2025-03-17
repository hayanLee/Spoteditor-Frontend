import { PageNation } from './commonApi';
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
  author: string;
  name: string;
  image: Image;
  address: Address;
  views: number;
}

/* 유저 로그리스트 응답*/
type UserLogs = PageNation<LogContent[]>

/* 유저 북마크 장소 응답*/
type UserBookmarkPlaces = PageNation<Place[]>

/* 유저 북마크 로그리스트 응답 */
type UserBookmarkLogs = PageNation<PlaceLog[]>
