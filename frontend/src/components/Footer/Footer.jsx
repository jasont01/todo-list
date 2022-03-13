import { FaCode } from 'react-icons/fa'
import { SiUnsplash } from 'react-icons/si'
import styles from './Footer.module.css'

const Footer = () => {
  //TODO text-muted
  return (
    <div className={styles.container}>
      <FaCode />
      <span> created by </span>
      <a href='http://jasont.us'>Jason Thompson </a>
      <br />
      <SiUnsplash />
      <span> background by </span>
      <a href='https://unsplash.com/photos/3ym6i13Y9LU'>Mike Tinnion </a>
    </div>
  )
}
export default Footer
