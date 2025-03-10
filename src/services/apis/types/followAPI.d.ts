import { LogsQueryParams } from './logAPI.type';
import { IOtherUserParams, SortInfo } from './userLogAPI';

export type FollowParams = IOtherUserParams;
export type FollowQueryParams = LogsQueryParams;

interface User {
  userId: number;
  name: string;
  imageUrl: string;
}
export interface FollowResponse {
  content: User[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: SortInfo;
}
