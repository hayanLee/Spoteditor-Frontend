import { SortInfo } from "./userLogAPI";

export interface ApiErrorResponse {
  status: string;
  code: string;
  message: string;
  timestamp: string;
}

export interface PageNation<T> {
  content: T;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: SortInfo;
}