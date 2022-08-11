import { useSelector } from 'react-redux'
import ListEntry from './ListEntry/ListEntry'
import NewListControl from './NewListControl/NewListControl'
import Footer from '../Footer/Footer'
import styles from './Lists.module.css'

const Lists = () => {
  const { lists, activeList } = useSelector((state) => state.lists)

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>-Lists-</h3>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <ListEntry
            key={list._id}
            list={list}
            active={list._id === activeList}
            onlyList={lists.length < 2}
          />
        ))}
      </ul>
      <NewListControl numLists={lists.length} />
      <Footer />
    </div>
  )
}

export default Lists
