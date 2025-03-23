import { AxiosInstance } from 'axios';
import { PresignUrlRequest, PresignUrlResponse } from './types/registerAPI.type';

class RegisterAPI {
  #axios;
  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getPresignUrl(file: PresignUrlRequest): Promise<PresignUrlResponse> {
    const path = '/api/purl';
    const res = await this.#axios.post(path, file);
    return { ...res.data, originalFile: file.originalFile };
  }

  async uploadImageWithPresignUrl(presignUrl: string, file: Blob) {
    const res = await this.#axios.put(presignUrl, file, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    console.log(res);
    return res.status;
  }
}

export default RegisterAPI;
