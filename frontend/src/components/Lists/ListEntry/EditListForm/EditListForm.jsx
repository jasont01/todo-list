import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import styles from './EditListForm.module.css'

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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        size='small'
        className={styles.titleEdit}
      />
      <Button
        id='list-add'
        type='submit'
        variant='contained'
        size='small'
        sx={{ backgroundColor: '#bada55', color: '#212529' }}
      >
        Save
      </Button>
    </Box>
  )
}

export default EditListForm
