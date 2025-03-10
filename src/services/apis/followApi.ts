import axios, { AxiosInstance } from 'axios';
import { FollowParams, FollowQueryParams, FollowResponse } from './types/followAPI';
import { ApiErrorResponse } from './types/commonApi';

class FollowAPI {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getFollower(params: FollowQueryParams): Promise<FollowResponse> {
    const response = await this.axios.get(`/api/follower`, { params });
    return response.data;
  }

  async getFollowing(params: FollowQueryParams): Promise<FollowResponse> {
    const response = await this.axios.get(`/api/following`, { params });
    return response.data;
  }

  async getOtherFollower({ userId, params }: FollowParams): Promise<FollowResponse> {
    const response = await this.axios.get(`/api/users/${userId}/follower`, { params });
    return response.data;
  }

  async getOtherFollowing({ userId, params }: FollowParams): Promise<FollowResponse> {
    const response = await this.axios.get(`/api/users/${userId}/following`, { params });
    return response.data;
  }

  async postFollow(userId: number): Promise<void> {
    try {
      await this.axios.post('/api/follow', { userId });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data as ApiErrorResponse;
      }
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }

  async deleteFollow(userId: number): Promise<void> {
    try {
      await this.axios.delete('/api/unfollow', { data: { userId } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data as ApiErrorResponse;
      }
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
}

export default FollowAPI;
