import { AxiosInstance } from 'axios';
import {  NotificationResponse } from './types/notificationAPI';

export default class NotificationAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getNotificationList(): Promise<NotificationResponse> {
    const response = await this.axios.get('/api/notice');
    return response.data;
  }

  async putNotiRead(notificationId: number): Promise<void> {
    await this.axios.put(`/api/notice/${notificationId}`);
  }

  async putNotiAllAsRead(): Promise<void> {
    await this.axios.put('/api/notice/all');
  }
}
