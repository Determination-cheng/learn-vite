import { defineConfig, normalizePath } from 'vite'
import path from 'path'
// React 项目必须
import react from '@vitejs/plugin-react'
// postcss 插件
import autoprefixer from 'autoprefixer'
// 代码检查与格式化
import viteESLint from 'vite-plugin-eslint'
import viteStylelint from '@amatlash/vite-plugin-stylelint'
// SVG
import svgr from 'vite-plugin-svgr'

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
  plugins: [
    react(),
    viteESLint(),
    viteStylelint({ exclude: /windicss|node_modules/ }),
    svgr(),
  ],

  //* css
  css: {
    // 预处理器
    preprocessorOptions: {
      scss: {
        // 该属性值会被每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },

    // CSS Modules
    modules: {
      // 该属性对生成的样式哈希值名称做定义
      // [name] 表示当前文件名  [local] 表示类名
      //   比如说 index.module.scss 下有个 header 属性
      //   那使用该 header 的类名就会显示为: index-module__header__IdNfn
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },

    // PostCSS
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        }),
      ],
    },
  },

  //* 别名
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets'),
    },
  },
})
