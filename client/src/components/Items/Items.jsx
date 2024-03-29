import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ItemEntry from './ItemEntry/ItemEntry'
import CategoryHeader from './CategoryHeader/CategoryHeader'
import NewItemControl from './NewItemControl/NewItemControl'
import styles from './Items.module.css'

const categories = ['high', 'medium', 'low', 'none']

const Items = () => {
  const [sorted, setSorted] = useState([])

  const { activeList } = useSelector((state) => state.lists)
  const { items } = useSelector((state) => state.items)

  useEffect(() => {
    const activeItems = items.filter((item) => item.listId === activeList)

    const sort = categories.map((category) => {
      const filtered = activeItems.filter((item) => item.priority === category)
      return {
        priority: category,
        items: filtered.sort((a, b) => new Date(a.date) - new Date(b.date)),
      }
    })
    setSorted(sort)
  }, [items, activeList])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDo List</h1>
      <hr />
      <div className={styles.header}>
        <h6 className={styles.itemHeader}>Item</h6>
        <h6 className={styles.duedateHeader}>Due Date</h6>
      </div>
      <div className={styles.itemContainer}>
        {sorted.map((category) => (
          <div key={category.priority} className={styles.priorityContainer}>
            <CategoryHeader category={category} items={items} />
            <ul className={styles.items}>
              {category.items.map((item) => (
                <ItemEntry key={item._id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <NewItemControl numItems={items.length} />
    </div>
  )
}

export default Items
