import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const URL = 'http://localhost:8800/api';

type Config = {
  mode: 'development' | 'production' | 'test';
  command?: 'serve' | 'build';
  isSsrBuild?: boolean;
  isPreview?: boolean;
};

export default ({ mode }: Config) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isDev = mode === 'development';

  const API_URL = env.VITE_API_URL || URL;

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      host: isDev ? '0.0.0.0' : '',
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    define: {
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(API_URL),
      __API_KEY__: JSON.stringify(env.VITE_API_KEY),
    },
  });
};
