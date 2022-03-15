import { FaRegFolder, FaRegFolderOpen, FaFolderOpen } from 'react-icons/fa'
import styles from './Folder.module.css'

const Folder = ({ active, hover }) => {
  return (
    <span className={styles.folder}>
      {active ? (
        <FaFolderOpen />
      ) : hover ? (
        <FaRegFolderOpen />
      ) : (
        <FaRegFolder />
      )}
    </span>
  )
}
export default Folder
