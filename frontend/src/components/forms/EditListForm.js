import { useState } from 'react'
//import { Button, Form } from 'react-bootstrap';

const EditListForm = ({ name, updateList }) => {
  const [input, setInput] = useState(name)

  return (
    // <Form.Group className='list-edit-form'>
    //   <Form.Control
    //     size='sm'
    //     type='text'
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //     onKeyPress={(e) => e.key === 'Enter' && updateList(input)}
    //     autoFocus
    //   />
    //   <Button size='sm' onClick={() => updateList(input)}>
    //     Save
    //   </Button>
    // </Form.Group>
    <div>Edit List Form...</div>
  )
}

export default EditListForm
