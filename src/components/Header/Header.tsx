import { useEffect } from 'react'
import styles from './index.module.scss'
// img
import logo from '@assets/imgs/vite.png'
// svg
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg'
// json
import { version } from '../../../package.json'
// web worker
import Worker from './example.js?worker'

// 1.初始化 worker 实例
const worker = new Worker()
// 2.主线程监听 worker 信息
worker.addEventListener('message', e => {
  console.log(e)
})

export function Header() {
  useEffect(() => {
    const img = document.getElementById('logo') as HTMLImageElement
    img.src = logo
  }, [])

  return (
    <div className={styles.header}>
      <p>This is header</p>

      <div>
        <h2>引入图片</h2>
        {/* 引入图片方式1 */}
        <img src={logo} alt="" />
        {/* 引入图片方式2 */}
        <img id="logo" alt="" />
      </div>

      <div>
        {/* SVG */}
        <h2>SVG</h2>
        <ReactLogo style={{ width: 50 }} />
      </div>

      <div>
        <h2>JSON</h2>
        <span>{version}</span>
      </div>
    </div>
  )
}
