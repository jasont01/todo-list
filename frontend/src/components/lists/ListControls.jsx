import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'

const ListControls = ({ editMode, setEditMode, confirmDelete, onlyList }) => {
  return (
    <div className='list-controls'>
      {editMode ? (
        <FaWindowClose
          className='list-edit'
          onClick={() => setEditMode(false)}
        />
      ) : (
        <FaEdit className='list-edit' onClick={() => setEditMode(true)} />
      )}
      {!onlyList && <FaTrash className='list-delete' onClick={confirmDelete} />}
    </div>
  )
}
export default ListControls
