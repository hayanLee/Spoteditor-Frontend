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

  async getImage(filePath: string) {
    const url = `https://spoteditor-bucket.s3.ap-northeast-2.amazonaws.com/${filePath}`;
    const res = await this.#axios.get(url, { responseType: 'blob' });
    console.log(res);
  }
}

export default LogAPI;
