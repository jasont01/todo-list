import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  updateList,
  deleteList,
  setActiveList,
} from '../../features/lists/listSlice'
import { FaRegFolder, FaRegFolderOpen, FaFolderOpen } from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert'
import EditListForm from '../forms/EditListForm'
import ListControls from './ListControls'

const List = ({ list, list: { _id: id, title, active }, onlyList }) => {
  const [hover, setHover] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  const handleUpdateList = (e, newTitle) => {
    e.preventDefault()
    dispatch(updateList({ ...list, title: newTitle }))
    setEditMode(false)
  }

  const confirmDelete = () => {
    confirmAlert({
      title: `Delete ${title}`,
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Delete',
          className: 'btn btn-danger',
          onClick: () => dispatch(deleteList(id)),
        },
        {
          label: 'Cancel',
          className: 'btn btn-primary',
        },
      ],
    })
  }

  return (
    <li className='list'>
      {editMode ? (
        <EditListForm id={id} title={title} updateList={handleUpdateList} />
      ) : (
        <div
          className='list-wrapper'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => !active && dispatch(setActiveList(id))}
        >
          <span className='folder'>
            {active ? (
              <FaFolderOpen />
            ) : hover ? (
              <FaRegFolderOpen />
            ) : (
              <FaRegFolder />
            )}
          </span>
          <span className='list-name'>{title}</span>
        </div>
      )}
      <ListControls
        editMode={editMode}
        setEditMode={setEditMode}
        confirmDelete={confirmDelete}
        onlyList={onlyList}
      />
    </li>
  )
}

export default List
