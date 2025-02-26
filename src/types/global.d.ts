import { kakao } from 'kakao.maps.d.ts';
declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

export {};
