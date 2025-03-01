import { Address, Image } from './registerAPI.type';

export interface LogsQueryParams {
  page: number;
  size: number;
  direction?: 'ASC' | 'DESC';
}

export interface LogContent {
  placeLogId: number;
  name: string;
  image: Image;
  address: Address;
  views: number;
}

export interface PlaceInLog {
  placeId: number;
  name: string;
  description: string;
  address: Address;
  category: string;
  images: Image;
}
