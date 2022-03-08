import { useSelector } from 'react-redux'
import List from './List'
import NewListControl from './NewListControl'

const Lists = () => {
  const { lists } = useSelector((state) => state.lists)

  return (
    <div className='list-container'>
      <h3 className='lists-header'>-Lists-</h3>
      <ul className='lists'>
        {lists.map((list) => (
          <List key={list._id} list={list} onlyList={lists.length < 2} />
        ))}
      </ul>
      <NewListControl numLists={lists.length} />
    </div>
  )
}

export default Lists
