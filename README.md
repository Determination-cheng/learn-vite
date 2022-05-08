## 指定根目录

`vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  //* 指定入口文件在 src，这时 vite 会主动找 src 下的 index.html
  root: path.join(__dirname, 'src'),

  //* 插件
  plugins: [react()],
})
```

注意此时 src 下的 index.html 引入的路径也要改
比如说引入 src/main.ts，在 src/index.html 中引入的路径为 `/main.ts`

---

## CSS

**问题**

- 不支持选择器嵌套
- 样式污染
- 浏览器兼容
- 代码体积 ( 没用的 CSS 也会被打包 )

**解决方案**

- CSS 预处理器
  - sass/scss
  - less
  - stylus
- CSS Modules
- PostCSS
- CSS in JS
  - emotion
  - styled-components
- CSS 原子化框架
  - Tailwind CSS
  - Windi CSS

### CSS 预处理器

`vite.config.ts`

```ts
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
    // 预处理器
    preprocessorOptions: {
      scss: {
        // 该属性值会被每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
})
```

### CSS Modules

`vite.config.ts`

```ts
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
  },
})
```

### PostCSS

首先需要添加开发依赖:

```shell
pnpm add -D autoprefixer
```

`vite.config.ts`

```ts
import { defineConfig, normalizePath } from 'vite'

// 引入
import autoprefixer from 'autoprefixer'

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
})
```

**其他常见插件**

- postcss-pxtorem
  将 px 转换成 rem，常用于适配移动端
- postcss-preset-env
  可以编写最新的 css 语法
- cssnano
  用于压缩 CSS 代码，该插件相对于其他的更智能

---

## 代码检查和格式化

### JS/TS 检查

**ESLint**

准备工作

```shell
# 1.安装依赖
pnpm add -D eslint

# 2.ESLint 初始化
npx eslint --init

# 3.补充安装依赖 (在执行第二步之后根据选择会自动执行)
pnpm add -D eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
```

`.eslintrc.js`

* parser
  ESLint -> Espree ( Acron ) <-- `@typescript-eslint/parser` -- TS

* parserOptions

  * ecmaVersion
    * ES6
    * ES2015
    * latest
  * sourceType
    * script ( default )
    * module ( ES Module )
  * ecmaFeatures
    * jsx

* rules

  * { [key in string]: [string | number, string] }

  * 配置数组第一项为规则 ID

    * off | 0 关闭规则
    * warn | 1 开启规则，只警告不报错 ( 不使程序退出 )
    * error | 2 开启规则，违反规则后抛出 error

  * 规则文档

    https://cn.eslint.org/docs/rules/

  * eg.

    ```js
    {
      'no-cond-assign': ['error', 'always'],
    	// 'no-cond-assign': 'error'
    }
    ```

* plugins

  ```js
  // pnpm add -D @typescript-eslint/eslint-plugin@latest
  
  // .eslintrc.js
  module.exports = {
    // 添加 TS 规则，可省略`eslint-plugin`
    plugins: ['@typescript-eslint']
  }
  ```

  使用插件后还要在规则中配置相应的 TS 规则

  ```js
  // .eslintrc.js
  module.exports = {
    // 开启一些 TS 规则
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }
  ```

* extends
  继承另一份 ESLint 配置，这样就不用手动一一配置  plugins、rules 之类的

  * 从 ESLint 本身继承
  * 从类似 `eslint-config-xxx` 的 npm 包继承
  * 从 ESLint 插件继承

  ```js
  // .eslintrc.js
  module.exports = {
     "extends": [
       // 第1种情况 
       "eslint:recommended",
       // 第2种情况，一般配置的时候可以省略 `eslint-config`
       "standard"
       // 第3种情况，可以省略包名中的 `eslint-plugin`
       // 格式一般为: `plugin:${pluginName}/${configName}`
       "plugin:react/recommended"
       "plugin:@typescript-eslint/recommended",
     ]
  }
  ```

* env
  运行环境

  ```js
  // .eslint.js
  module.export = {
    "env": {
      "browser": "true", // 会启用 window 等全局变量
      "node": "true" // 会启用 global 等全局变量
    }
  }
  ```

  如果生成的 .eslint.js 使用了 `module.export`，这时不开启 `{ node: true }` 的话就会报警告

* globals
  声明全局变量

  * 'writable' | true  变量可重写
  * 'readonly' | false 变量不可重写
  * 'off' 禁用该全局变量

  ```js
  // .eslintrc.js
  module.exports = {
    "globals": {
      // 不可重写
      "$": false, 
      "jQuery": false 
    }
  }
  ```

  



### CSS 检查



### 提交前检查







