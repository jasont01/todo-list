import { useState } from 'react'
import EditItemForm from './EditItemForm/EditItemForm'
import Checkbox from './Checkbox/Checkbox'
import DueDate from './DueDate'
import ItemControls from './ItemControls/ItemControls'
import styles from './ItemEntry.module.css'

const Item = ({ item }) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <li className={styles.item}>
      {editMode ? (
        <EditItemForm item={item} setEditMode={setEditMode} />
      ) : (
        <>
          <Checkbox item={item} />
          <DueDate date={item.date} />
        </>
      )}
      <ItemControls
        id={item._id}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </li>
  )
}

export default Item
