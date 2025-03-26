import { Address, Image } from './registerAPI.type';

export interface LogsQueryParams {
  page?: number;
  size?: number;
  direction?: 'ASC' | 'DESC';
}

export interface LogContent {
  placeLogId: number;
  name: string; // 제목
  author: string; // 작성자
  image: Image;
  address: Address;
  views: number;
}

export interface LogContents {
  content: LogContent[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface PlaceInLog {
  placeId: number;
  name: string;
  description: string;
  address: Address;
  category: string;
  images: Image[];
}
