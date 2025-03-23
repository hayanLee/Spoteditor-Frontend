import { PlaceInLog } from './logAPI.type';

// getPresignUrl
export interface PresignUrlRequest {
  originalFile: string;
}

export interface PresignUrlResponse {
  preSignedUrl: string;
  uuid: string;
  originalFile: string;
}

// createLog
export interface Address {
  address: string; // "서울특별시 강남구 역삼동 825-1"
  roadAddress: string; // "서울특별시 강남구 테헤란로 152"
  latitude: number; // 37.50523741
  longitude: number; // 127.0522163
  sido: string; // "서울특별시"
  bname: string; // "역삼동"
  sigungu: string; // "강남구"
}

export interface Place {
  name: string; // "장소1"
  description: string; // "테스트 장소"
  address: Address;
  category: string; // "TOUR"
  originalFiles: string[]; // ["뉴고인돌", "뉴빛첨성대"]
  uuids: string[]; // ["8a4dca87-a2f5-4ee5-8036-7d980c2c426e", "4cd1ed45-e283-492f-a461-2fd1d226731a"]
}

export interface Log {
  name: string; // "테스트 로그"
  description: string; // "테스트 로그 설명"
  originalFile: string; // "뉴첨성대"
  uuid: string; // "3d4c5aa1-07ce-45be-82d5-34005db77a6f"
  status: 'public' | 'private'; // "public"
  tags: string[]; // ✅ 아직 작업중이라 임시로 빈배열
  places: Place[]; // 여러 장소를 포함할 수 있음
}

interface Tag {
  name: string;
  category: 'WITH_WHOM';
}

// createLog response
export interface Image {
  imageId: number;
  originalFile: string;
  storedFile: string;
}

export interface LogResponse {
  placeLogId: number;
  userId: 0;
  userName: 'string';
  userImage: 'string';
  isFollowing: true;
  name: string;
  description: string;
  image: Image;
  address: Address;
  status: 'public'; // 고정된 값
  views: number;
  tags: [];
  places: PlaceInLog[];
  userId: number;
}

// 수정 request
export type UpdateRequest = {
  name?: string;
  description?: string;
  originalFile?: string;
  uuid?: string;
  deletePlaceIds?: number[];
  addPlaces?: Place[];
  updatePlaces?: {
    id?: number;
    description?: string;
    deleteImageIds?: number[];
    originalFiles?: string[];
    uuids?: string[];
  }[];
};
