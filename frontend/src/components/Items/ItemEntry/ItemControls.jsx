import { useDispatch } from 'react-redux'
import { deleteItem } from '../../../features/items/itemSlice'
import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'

const ItemControls = ({ id, editMode, setEditMode }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteItem(id))
  }
  return (
    <div
      style={{
        fontSize: '0.7em',
        marginRight: '1em',
      }}
    >
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
  )
}
export default ItemControls
