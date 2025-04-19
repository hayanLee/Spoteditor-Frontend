import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import stripImport from '@rollup/plugin-strip';

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  const isDevelop: boolean = env.VITE_DEVELOP === 'true';
  const isVercel: boolean = !!process.env.VERCEL; // Vercel 환경인지 확인

  return defineConfig({
    plugins: [
      react(),
      (stripImport as any)({
        include: ['**/*.ts', '**/*.tsx'], // TypeScript 파일만 대상
        functions: ['console.log', 'console.warn', 'console.debug'], // 제거할 함수들
        debugger: true, // debugger 문도 제거
      }),
    ],
    define: {
      global: {}, // 웹소켓 'global is not defined' 해결
    },
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server:
      !isVercel && isDevelop
        ? {
            https: {
              key: fs.readFileSync('localhost-key.pem'),
              cert: fs.readFileSync('localhost.pem'),
            },
          }
        : undefined, // Vercel에서는 HTTPS 설정 제거
  });
};
