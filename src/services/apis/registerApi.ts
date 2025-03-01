import { AxiosInstance } from 'axios';
import { Log, PresignedUrlWithName, PresignUrlRequest } from './types/registerAPI.type';

class RegisterAPI {
  #axios;
  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getPresignUrl(file: PresignUrlRequest): Promise<PresignedUrlWithName> {
    const path = '/api/purl';
    const res = await this.#axios.post(path, file);
    return { ...res.data, originalFile: file.originalFile };
  }

  async uploadImageWithPresignUrl(presignUrl: string, file: FormData) {
    const res = await this.#axios.put(presignUrl, file);
    return res.status;
  }

  async createLog(logData: Log) {
    const path = '/api/placelogs';
    const res = await this.#axios.post(path, logData);
    return res.data;
  }
}

export default RegisterAPI;
