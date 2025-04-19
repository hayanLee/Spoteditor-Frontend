/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SOCIAL_LOGIN_URL: string;
  readonly VITE_KAKAO_MAP_KEY: string;
  readonly VITE_DEVELOP?: string;
  readonly VITE_CLOUDE_FRONT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
