import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const NewListForm = ({ createNewList, cancelNewList }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const listName = input.length > 0 ? input : 'untitled list';
    createNewList(listName);
  };

  return (
    <Form.Group>
      <Form.Control
        id='new-list-name'
        size='sm'
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder='List Name'
        autoFocus
      />
      <Button id='new-list-add' size='sm' onClick={handleSubmit}>
        Add
      </Button>
      <Button
        id='new-list-cancel'
        variant='secondary'
        size='sm'
        onClick={cancelNewList}
      >
        cancel
      </Button>
    </Form.Group>
  );
};

export default NewListForm;
