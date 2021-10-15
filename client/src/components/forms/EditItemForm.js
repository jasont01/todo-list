import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { parseJSON } from 'date-fns';
import PrioritySelect from './PrioritySelect';

const EditItemForm = ({ item, updateItem }) => {
  const [name, setName] = useState(item.name);
  const [date, setDate] = useState(parseJSON(item.date));
  const [priority, setPriority] = useState(item.priority);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = () => {
    name.length > 0 ? updateItem(name, date, priority) : setIsInvalid(true);
  };

  return (
    <Form.Row className='item-edit'>
      <Form.Group className='item-edit-name'>
        <Form.Control
          isInvalid={isInvalid}
          size='sm'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Form.Control.Feedback type='invalid'>
          Item name is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <PrioritySelect
          className='item-edit-priority'
          defaultValue={priority}
          onChange={setPriority}
        />
      </Form.Group>
      <Form.Group className='item-edit-date'>
        <DatePicker
          showPopperArrow={false}
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={new Date()}
          dateFormat='yyyy-MM-dd'
          className='form-control form-control-sm date-picker'
        />
      </Form.Group>
      <Button
        size='sm'
        className='item-edit-submit'
        onClick={() => handleSubmit()}
      >
        Save
      </Button>
    </Form.Row>
  );
};

export default EditItemForm;
