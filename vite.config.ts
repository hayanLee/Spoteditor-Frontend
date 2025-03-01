import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  const isDevelop: boolean = env.VITE_DEVELOP === 'true';
  const isVercel: boolean = !!process.env.VERCEL; // Vercel 환경인지 확인

  return defineConfig({
    plugins: [react()],
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
