import { useSelector, useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { deleteList } from '../../features/lists/listSlice'
import List from './List'
import NewListControl from './NewListControl'

const Lists = ({ saveList, setActiveList }) => {
  const dispatch = useDispatch()

  const { lists } = useSelector((state) => state.lists)

  // const createNewList = (title) => {
  //   const newList = {
  //     title,
  //   }
  // ==> dispatch(createList(title))
  //   setLists([...lists, newList])
  // }

  const confirmDelete = (id, name) => {
    confirmAlert({
      title: `Delete ${name}`,
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
    <div className='list-container'>
      <h3 className='lists-header'>-Lists-</h3>
      <ul className='lists'>
        {lists.map((list) => (
          <List
            key={list._id}
            list={list}
            changeActive={setActiveList}
            onlyList={lists.length < 2}
            saveList={saveList}
            deleteList={confirmDelete}
          />
        ))}
      </ul>
      <NewListControl numLists={lists.length} />
    </div>
  )
}

export default Lists
