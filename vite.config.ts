import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 指定入口文件在 src，这时 vite 会主动找 src 下的 index.html
  root: path.join(__dirname, 'src'),
  plugins: [react()],
})
