import { useState } from 'react'
import Button from '@mui/material/Button'
import { FaPlus } from 'react-icons/fa'
import NewItemForm from './NewItemForm/NewItemForm'

const MAX_ITEMS = 10

const NewItemControl = ({ numItems }) => {
  const [showNewItemForm, setShowNewItemForm] = useState(false)

  return (
    <div className='controls'>
      {showNewItemForm ? (
        <NewItemForm
          cancelNewItem={() => setShowNewItemForm(false)}
          setShowNewItemForm={setShowNewItemForm}
        />
      ) : (
        <Button
          id='new-item-btn'
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
