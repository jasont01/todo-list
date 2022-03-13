import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../../features/items/itemSlice'
import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'
import EditItemForm from '../../forms/EditItemForm'
import Checkbox from '../Checkbox/Checkbox'
import DueDate from '../DueDate'
import styles from './ItemEntry.module.css'

const Item = ({ item }) => {
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteItem(item._id))
  }

  return (
    <li className={styles.item}>
      {editMode ? (
        <EditItemForm item={item} />
      ) : (
        <>
          <Checkbox item={item} />
          <DueDate date={item.date} />
        </>
      )}
      <div className={styles.controls}>
        {editMode ? (
          <FaWindowClose
            className='item-edit'
            onClick={() => setEditMode(false)}
          />
        ) : (
          <FaEdit className='item-edit' onClick={() => setEditMode(true)} />
        )}
        <FaTrash className='item-delete' onClick={handleDelete} />
      </div>
    </li>
  )
}

export default Item
