import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createItem } from '../../../features/items/itemSlice'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import PrioritySelect from '../PrioritySelect'

const NewItemForm = ({ cancelNewItem, setShowNewItemForm }) => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [priority, setPriority] = useState('None')

  //TODO
  const [isInvalid, setIsInvalid] = useState(false)

  const { activeList } = useSelector((state) => state.lists)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    description.length > 0 ? submitNewItem() : setIsInvalid(true)
  }

  const submitNewItem = () => {
    dispatch(createItem({ description, date, priority, listId: activeList }))
    setShowNewItemForm(false)
  }

  return (
    <Box className='new-item-form' component='form' onSubmit={handleSubmit}>
      <TextField
        className='new-item-name'
        name='description'
        size='sm'
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Item'
        autoFocus
        required
      />
      {/* <Form.Control.Feedback type='invalid'>
          Item name is required.
        </Form.Control.Feedback> */}
      <DatePicker
        showPopperArrow={false}
        selected={date}
        onChange={(date) => setDate(date)}
        minDate={new Date()}
        dateFormat='yyyy-MM-dd'
        className='form-control form-control-sm new-item-date'
      />
      <PrioritySelect
        className='new-item-priority'
        placeholder='--Priority--'
        name='priority'
        value={priority}
        onChange={setPriority}
      />
      <Button variant='contained' size='small' type='submit'>
        Add
      </Button>
      <Button
        id='new-item-cancel'
        size='small'
        variant='secondary'
        onClick={cancelNewItem}
      >
        cancel
      </Button>
    </Box>
  )
}

export default NewItemForm
