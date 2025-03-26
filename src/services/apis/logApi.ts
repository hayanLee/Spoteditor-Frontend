import { AxiosInstance } from 'axios';
import { LogsQueryParams } from './types/logAPI.type';
import { Log, UpdateRequest } from './types/registerAPI.type';

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

  async createLog(logData: Log) {
    const path = '/api/placelogs';
    const res = await this.#axios.post(path, logData);
    // console.log('로그 등록', res);
    return { data: res.data, status: res.status };
  }

  async deleteLog(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}`;
    await this.#axios.delete(path);
    // console.log('로그 삭제', res);
  }

  async updateLog(placeLogId: number, requestData: UpdateRequest) {
    // console.log(placeLogId, '보내는 데이터', requestData);
    const path = `/api/placelogs/${placeLogId}`;
    const res = await this.#axios.patch(path, requestData);
    if (res.status === 200) return { data: res.data, isSuccess: true };
    // console.log('로그 업데이트', res);
  }

  // 로그 북마크
  async addLogBookMark(placeLogId: number) {
    try {
      const path = `/api/placelogs/${placeLogId}/bookmark`;
      const res = await this.#axios.post(path);
      // console.log('로그 북마크 추가', res);
      if (res.status !== 200) throw new Error('로그 북마크 실패');
    } catch (error) {
      console.error(error);
    }
  }

  async deleteLogBookMark(placeLogId: number) {
    try {
      const path = `/api/placelogs/${placeLogId}/bookmark`;
      const res = await this.#axios.delete(path);
      // console.log('로그 북마크 삭제', res);
      if (res.status !== 204) throw new Error('로그 북마크 삭제 실패');
    } catch (error) {
      console.error(error);
    }
  }

  async getLogBookMark(placeLogId: number) {
    try {
      const path = `/api/placelogs/bookmark/check?placeLogId=${placeLogId} `;
      const res = await this.#axios.get(path);
      if (res.status !== 200) throw new Error('로그 북마크 조회 실패');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default LogAPI;
