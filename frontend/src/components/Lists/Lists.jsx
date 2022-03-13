import { useSelector } from 'react-redux'
import ListEntry from './ListEntry/ListEntry'
import NewListControl from './NewListControl'
import styles from './Lists.module.css'

const Lists = () => {
  const { lists } = useSelector((state) => state.lists)

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>-Lists-</h3>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <ListEntry key={list._id} list={list} onlyList={lists.length < 2} />
        ))}
      </ul>
      <NewListControl numLists={lists.length} />
    </div>
  )
}

export default Lists
