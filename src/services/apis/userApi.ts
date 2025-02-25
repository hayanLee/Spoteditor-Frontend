import { currentAuth } from '@/services/apis/authApi';

interface IAddress {
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  sido: string;
  bname: string;
  sigungu: string;
}

interface IUserPlaceLog {
  userName: string;
  id: number;
  name: string;
  imageUrl: string;
  address: IAddress;
}

interface IUserBookmarkPlace extends IUserPlaceLog {
  category: 'TOUR';
}

export interface IUser {
  name: string;
  instagramId: string;
  imageUrl: string;
  description: string;
  follower: number;
  following: number;
  userPlaceLogDtoList: IUserPlaceLog[];
  userBookmarkPlaceLogDtoList: IUserPlaceLog[];
  userBookmarkPlaceDtoList: IUserBookmarkPlace[];
}

class User {
  private http = currentAuth;

  /* 로그인된 사용자 정보 가져오기 */
  async getUser(): Promise<IUser> {
    const response = await this.http.get('/users');
    return response.data;
  }
}

export const currentUser = new User();
