import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isDevelop: boolean = process.env.VITE_DEVELOP === 'true';

  return defineConfig({
    plugins: [react()],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      https: isDevelop
        ? {
            key: fs.readFileSync('localhost-key.pem'),
            cert: fs.readFileSync('localhost.pem'),
          }
        : undefined, // false 대신 undefined 사용하여 타입 에러 방지
    },
  });
};
