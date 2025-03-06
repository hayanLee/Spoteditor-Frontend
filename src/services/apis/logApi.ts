import { AxiosInstance } from 'axios';
import { LogsQueryParams } from './types/logAPI.type';

class LogAPI {
  #axios;
  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getLogs(params: LogsQueryParams) {
    const path = '/api/placelogs';
    const res = await this.#axios.get(path, {
      params,
    });
    return res.data;
  }

  async getLog(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}`;
    const res = await this.#axios.get(path);
    return res.data;
  }

  async deleteLog(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}`;
    const res = await this.#axios.delete(path);
    console.log('로그 삭제', res);
  }

  // 로그 북마크
  async addLogBookMark(placeLogId: number) {
    try {
      const path = `/api/placelogs/${placeLogId}/bookmark`;
      const res = await this.#axios.post(path);
      if (res.status !== 201) throw new Error('로그 북마크 실패');
    } catch (error) {
      console.log(error);
    }
  }

  async deleteLogBookMark(placeLogId: number) {
    try {
      const path = `/api/placelogs/${placeLogId}/bookmark`;
      const res = await this.#axios.delete(path);
      if (res.status !== 204) throw new Error('로그 북마크 삭제 실패');
    } catch (error) {
      console.log(error);
    }
  }

  // 장소 북마크
  async addPlaceBookMark(placeId: number) {
    try {
      const path = `/api/placelogs/bookmark`;
      const res = await this.#axios.post(path, { placeId });
      if (res.status !== 200) throw new Error('장소 북마크 실패');
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlaceBookMark(placeId: number) {
    try {
      const path = `/api/placelogs/bookmark`;
      const res = await this.#axios.delete(path, { data: { placeId } });
      if (res.status !== 204) throw new Error('장소 북마크 삭제 실패');
    } catch (error) {
      console.log(error);
    }
  }
}

export default LogAPI;
