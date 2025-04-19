import { IOhterUser, IUpdateUser, IUser } from '@/services/apis/types/userAPI';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { AxiosInstance } from 'axios';
import userDefaultAvatar from '@/assets/profile/user-default-avatar.png';

export class UserAPI {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /* 로그인된 사용자 정보 가져오기 */
  async getUser(): Promise<IUser> {
    const response = await this.axios.get('/api/users');
    const data = response.data;

    return {
      ...data,
      profileImage: {
        ...data.profileImage,
        imageUrl:
          data.profileImage.imageUrl === null
            ? userDefaultAvatar
            : data.profileImage.imageId === null
            ? data.profileImage.imageUrl
            : getImgFromCloudFront(data.profileImage.imageUrl),
      },
    };
  }

  async deleteUser() {
    const response = await this.axios.delete('/api/users');
    return response.data;
  }

  async patchUser(userData: IUpdateUser): Promise<IUpdateUser> {
    const response = await this.axios.patch('/api/users', userData);
    return response.data;
  }
}

export class OtherUserAPI {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getOtherUser(userId: number): Promise<IOhterUser> {
    const response = await this.axios.get(`/api/users/${userId}`);
    const data = response.data;

    return {
      ...data,
      profileImage: {
        ...data.profileImage,
        imageUrl:
          data.profileImage.imageId === null
            ? data.profileImage.imageUrl
            : getImgFromCloudFront(data.profileImage.imageUrl),
      },
    };
  }
}
