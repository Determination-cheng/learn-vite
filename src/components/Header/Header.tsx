import { useEffect } from 'react'
import styles from './index.module.scss'
import logo from '@assets/imgs/vite.png'
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg'
import { version } from '../../../package.json'

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
