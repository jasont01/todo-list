import { useState, useEffect } from 'react'
import styles from './CategoryHeader.module.css'

const CategoryHeader = ({ category, items }) => {
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    setShowHeader(
      category.items.length === 0
        ? false
        : category.priority === 'none'
        ? !items.every((item) => item.priority === 'none')
        : true
    )
  }, [items, category])

  return (
    <>
      {showHeader && (
        <span className={`${styles.priority} ${styles[category.priority]}`}>
          {category.priority === 'none' ? 'No' : category.priority} Priority
        </span>
      )}
    </>
  )
}

export default CategoryHeader
