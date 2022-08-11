import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { parseJSON, startOfDay } from 'date-fns'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import PrioritySelect from '../../PrioritySelect'
import { updateItem } from '../../../../features/items/itemSlice'
import styles from './EditItemForm.module.css'

const EditItemForm = ({ item, setEditMode }) => {
  const [name, setName] = useState(item.description)
  const [date, setDate] = useState(parseJSON(item.date))
  const [priority, setPriority] = useState(item.priority)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const handleUpdate = () => {
    const updatedItem = {
      ...item,
      description: name,
      date: startOfDay(date),
      priority: priority,
    }
    dispatch(updateItem(updatedItem))
    setEditMode(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    name.length > 0 ? handleUpdate() : setError(true)
  }

  const onChange = (e) => {
    setName(e.target.value)
    if (error) {
      setError(false)
    }
  }

  return (
    <Box
      className={styles.container}
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', height: '1.2em' }}
    >
      <TextField
        className={styles.name}
        size='small'
        lable='item description'
        value={name}
        onChange={onChange}
        helperText={error ? 'cannot be empty' : null}
        error={error}
      />
      <PrioritySelect value={priority} setPriority={setPriority} />
      <DatePicker
        value={date}
        onChange={(input) => setDate(input)}
        renderInput={(params) => <TextField {...params} size='small' />}
      />
      <Button
        size='small'
        variant='contained'
        type='submit'
        sx={{ color: '#212529', backgroundColor: '#bada55' }}
      >
        Save
      </Button>
    </Box>
  )
}

export default EditItemForm
