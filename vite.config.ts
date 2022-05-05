import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 全局 scss 文件
// 使用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/global/css/variable.scss'),
)

// https://vitejs.dev/config/
export default defineConfig({
  //* 指定入口文件在 src，这时 vite 会主动找 src 下的 index.html
  // root: path.join(__dirname, 'src'),

  //* 插件
  plugins: [react()],

  //* css
  css: {
    preprocessorOptions: {
      scss: {
        // 该属性值会被每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
})
