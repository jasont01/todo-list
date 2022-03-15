import { useState } from 'react'
import Button from '@mui/material/Button'
import { FaPlus } from 'react-icons/fa'
import NewItemForm from '../NewItemForm/NewItemForm'
import styles from './NewItemControl.module.css'

const MAX_ITEMS = 10

const NewItemControl = ({ numItems }) => {
  const [showNewItemForm, setShowNewItemForm] = useState(false)

  return (
    <div className={styles.container}>
      {showNewItemForm ? (
        <NewItemForm
          cancelNewItem={() => setShowNewItemForm(false)}
          setShowNewItemForm={setShowNewItemForm}
        />
      ) : (
        <Button
          className={styles.newItemBtn}
          disabled={numItems >= MAX_ITEMS}
          onClick={() => setShowNewItemForm(true)}
        >
          <FaPlus />
        </Button>
      )}
    </div>
  )
}

export default NewItemControl
