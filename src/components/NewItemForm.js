import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import PrioritySelect from './PrioritySelect';

const NewItemForm = ({ createNewItem, cancelNewItem }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('none');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = () => {
    name.length > 0 ? createNewItem(name, date, priority) : setIsInvalid(true);
  };

  return (
    <div className='new-item-form'>
      <Form.Group>
        <Form.Control
          className='new-item-name'
          isInvalid={isInvalid}
          size='sm'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder='Item'
          autoFocus
          required
        />
        <Form.Control.Feedback type='invalid'>
          Item name is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Row>
        <Form.Group>
          <DatePicker
            showPopperArrow={false}
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            dateFormat='yyyy-MM-dd'
            className='form-control form-control-sm new-item-date'
          />
        </Form.Group>
        <Form.Group>
          <PrioritySelect
            className='new-item-priority'
            placeholder='--Priority--'
            onChange={setPriority}
          />
        </Form.Group>
      </Form.Row>
      <Button size='sm' onClick={handleSubmit}>
        Add
      </Button>
      <Button
        id='new-item-cancel'
        size='sm'
        variant='secondary'
        onClick={cancelNewItem}
      >
        cancel
      </Button>
    </div>
  );
};

export default NewItemForm;
