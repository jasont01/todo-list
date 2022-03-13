import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { createList } from '../../features/lists/listSlice'

const NewListForm = ({ cancelNewList, setShowNewListForm }) => {
  const [input, setInput] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createList({ title: input }))
    setShowNewListForm(false)
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <TextField
        id='new-list-title'
        name='new-list-title'
        label='List Title'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        size='small'
      />
      <Button id='new-list-add' type='submit' variant='contained' size='small'>
        Add
      </Button>
      <Button
        id='new-list-cancel'
        onClick={cancelNewList}
        color='error'
        size='small'
      >
        cancel
      </Button>
    </Box>
  )
}

export default NewListForm
