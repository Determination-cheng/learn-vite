import { useEffect } from 'react'
import styles from './index.module.scss'
import logo from '@assets/imgs/vite.png'

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
    </div>
  )
}
