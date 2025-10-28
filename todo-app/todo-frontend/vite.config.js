import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 监听所有网络接口
    port: 5173,
    strictPort: true,
    allowedHosts: ['app', 'localhost', '.localhost'],
    hmr: {
      clientPort: 5173
    },
    watch: {
      usePolling: true // Docker 环境中需要轮询
    }
  }
})