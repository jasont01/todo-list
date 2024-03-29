import { useState } from 'react'
import Button from '@mui/material/Button'
import NewListForm from '../NewListForm/NewListForm'
import styles from './NewListControl.module.css'

const MAX_LISTS = 18

const NewListControl = ({ numLists }) => {
  const [showNewListForm, setShowNewListForm] = useState(false)

  return (
    <>
      {showNewListForm ? (
        <NewListForm
          cancelNewList={() => setShowNewListForm(false)}
          setShowNewListForm={setShowNewListForm}
        />
      ) : (
        <Button
          className={styles.newListBtn}
          disabled={numLists >= MAX_LISTS}
          onClick={() => setShowNewListForm(true)}
        >
          new list
        </Button>
      )}
    </>
  )
}

export default NewListControl
