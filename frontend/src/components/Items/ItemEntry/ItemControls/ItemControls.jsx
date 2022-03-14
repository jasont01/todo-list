import { useDispatch } from 'react-redux'
import { deleteItem } from '../../../../features/items/itemSlice'
import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'
import styles from './ItemControls.module.css'

const ItemControls = ({ id, editMode, setEditMode }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteItem(id))
  }
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
      <FaTrash className={styles.delete} onClick={handleDelete} />
    </div>
  )
}
export default ItemControls
