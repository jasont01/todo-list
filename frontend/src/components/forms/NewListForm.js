import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { createList } from '../../features/lists/listSlice'

const NewListForm = ({ cancelNewList, setShowNewListForm }) => {
  const [input, setInput] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(createList(input))
    setShowNewListForm(false)
  }

  return (
    // <Form.Group>
    //   <Form.Control
    //     id='new-list-name'
    //     size='sm'
    //     type='text'
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //     onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
    //     placeholder='List Name'
    //     autoFocus
    //   />
    //   <Button id='new-list-add' size='sm' onClick={handleSubmit}>
    //     Add
    //   </Button>
    //   <Button
    //     id='new-list-cancel'
    //     variant='secondary'
    //     size='sm'
    //     onClick={cancelNewList}
    //   >
    //     cancel
    //   </Button>
    // </Form.Group>
    <Box>New List Form...</Box>
  )
}

export default NewListForm
