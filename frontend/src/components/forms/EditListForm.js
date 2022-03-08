import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const EditListForm = ({ title, updateList }) => {
  const [input, setInput] = useState(title)

  return (
    <Box
      component='form'
      onSubmit={(e) => updateList(e, input)}
      className='list-edit-form'
    >
      <TextField
        id='list-title'
        name='list-title'
        label='List Title'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        size='small'
      />
      <Button id='list-add' type='submit' variant='contained' size='small'>
        Save
      </Button>
    </Box>
  )
}

export default EditListForm
