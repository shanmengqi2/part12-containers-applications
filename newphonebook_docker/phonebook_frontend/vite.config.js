import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    },
    host: true, // 监听所有网络接口
    port: 5173,
    strictPort: true,
    allowedHosts: ['front', 'localhost', '.localhost'],
    hmr: {
      clientPort: 5173
    },
    watch: {
      usePolling: true // Docker 环境中需要轮询
    }
  }
})