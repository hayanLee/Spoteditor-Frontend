import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthClient {
  private instance: AxiosInstance;
  private lastRefreshAttempt: number = 0; // 마지막 Refresh 요청 시각 저장
  private refreshFailed: boolean = false; // RefreshToken 만료 후 재요청 방지

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
        const now = Date.now();

        // 1분 내에 RefreshToken 재요청 금지
        if (this.refreshFailed) {
          console.warn('🚨 RefreshToken이 만료됨 → 추가 요청 차단');
          return Promise.reject(error);
        }

        // 403 응답 시 1분 내 재요청 방지
        if (error.response?.status === 403 && !originalRequest._retry) {
          if (now - this.lastRefreshAttempt < 60000) {
            console.warn('⏳ 1분 이내에 RefreshToken 요청이 실행됨. 중복 요청 방지.');
            return Promise.reject(error);
          }

          originalRequest._retry = true;
          this.lastRefreshAttempt = now; // 마지막 시도 시간 기록

          try {
            console.log('AccessToken 만료 → RefreshToken으로 재발급 요청');
            await this.instance.post('/auth/refresh');
            console.log('새로운 AccessToken 발급 완료, 요청 재시도');

            originalRequest.withCredentials = true;
            return this.instance(originalRequest); // 기존 요청 재시도
          } catch (err) {
            console.error('RefreshToken도 만료 → 로그아웃 필요');
            this.refreshFailed = true; // RefreshToken 만료 상태 설정 (1분 동안 재시도 안 함)
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  async logoutUser() {
    try {
      console.log('로그아웃 요청 시작...');
      const res = await this.instance.post('/auth/logout');
      console.log('로그아웃 성공');

      //로그아웃 시 RefreshToken 관련 상태 초기화
      this.refreshFailed = false;
      this.lastRefreshAttempt = 0;

      return res.data;
    } catch (error) {
      console.error('로그아웃 실패:', error);
      return Promise.reject(error);
    }
  }
}

export const authClient = new AuthClient(`${API_BASE_URL}/api`);
export const currentAuth = authClient.getInstance();
export const logoutAuth = () => authClient.logoutUser();
