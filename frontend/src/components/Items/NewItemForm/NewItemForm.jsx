import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createItem } from '../../../features/items/itemSlice'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'
import PrioritySelect from '../PrioritySelect'
import styles from './NewItemForm.module.css'
import FormControl from '@mui/material/FormControl'

const NewItemForm = ({ cancelNewItem, setShowNewItemForm }) => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [priority, setPriority] = useState('none')

  const { activeList } = useSelector((state) => state.lists)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createItem({ description, date, priority, listId: activeList }))
    setShowNewItemForm(false)
  }

  return (
    <Box className={styles.container} component='form' onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <TextField
          className={styles.name}
          id='new-item-name'
          name='description'
          size='small'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label='Item'
          autoFocus
        />
      </FormControl>
      <Box sx={{ display: 'flex', margin: '0.7em 0' }}>
        <DatePicker
          label='Due Date'
          value={date}
          onChange={(input) => setDate(input)}
          renderInput={(params) => (
            <TextField {...params} size='small' sx={{ width: '160px' }} />
          )}
        />
        <PrioritySelect value={priority} setPriority={setPriority} />
      </Box>
      <Button
        variant='contained'
        size='small'
        type='submit'
        className={styles.addBtn}
        disabled={!description}
        area-label='Add Item'
      >
        Add
      </Button>
      <Button
        size='small'
        variant='contained'
        onClick={cancelNewItem}
        className={styles.cancelBtn}
        sx={{ marginLeft: '0.5em' }}
      >
        cancel
      </Button>
    </Box>
  )
}

export default NewItemForm
