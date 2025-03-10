import { currentAuth } from '@/services/apis/authApi';
import { IOhterUser, IUpdateUser, IUser } from '@/services/apis/types/userAPI';
import { AxiosInstance } from 'axios';

class User {
  private authApi = currentAuth;

  /* 로그인된 사용자 정보 가져오기 */
  async getUser(): Promise<IUser> {
    const response = await this.authApi.get('/users');
    return response.data;
  }

  async deleteUser() {
    const response = await this.authApi.delete('/users');
    return response.data;
  }

  async patchUser(userData: IUpdateUser): Promise<IUpdateUser> {
    const response = await this.authApi.patch('/users', userData);
    return response.data;
  }
}

export const authUserApi = new User();

export class OtherUser {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getOtherUser(userId: number): Promise<IOhterUser> {
    const response = await this.axios.get(`/api/users/${userId}`);
    return response.data;
  }
}
