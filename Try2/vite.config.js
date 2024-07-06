import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      // 允许访问的目录列表，添加你项目中需要访问的所有目录
      allow: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'public')
      ]
    }
  }
});
