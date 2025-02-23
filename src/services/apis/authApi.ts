import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    /* 요청 인터셉터: AccessToken 자동 포함 */
    this.instance.interceptors.request.use(
      (config) => {
        // 필요 시, 토큰을 자동으로 포함할 수 있도록 설정 가능 (예: localStorage에서 가져오기)
        return config;
      },
      (error) => Promise.reject(error)
    );

    /* 응답 인터셉터: AccessToken 갱신 처리 */
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // 무한 루프 방지

          try {
            console.log('AccessToken 만료 → RefreshToken으로 재발급 요청');
            await this.instance.post('/auth/refresh');
            console.log('새로운 AccessToken 발급 완료, 요청 재시도');

            return this.instance(originalRequest); // 기존 요청 재시도
          } catch (err) {
            console.error('RefreshToken도 만료 → 로그아웃 필요');
            window.location.href = '/';
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const currentAuth = new AuthClient(API_BASE_URL).getInstance();
