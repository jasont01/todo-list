import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'
import styles from './ListControls.module.css'

const ListControls = ({ editMode, setEditMode, confirmDelete, onlyList }) => {
  return (
    <div className={styles.container}>
      {editMode ? (
        <FaWindowClose
          className={styles.edit}
          onClick={() => setEditMode(false)}
        />
      ) : (
        <FaEdit className={styles.edit} onClick={() => setEditMode(true)} />
      )}
      {!onlyList && (
        <FaTrash className={styles.delete} onClick={confirmDelete} />
      )}
    </div>
  )
}
export default ListControls
