import { useState } from 'react';
import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa';
import EditItemForm from '../forms/EditItemForm';

import {
  formatDistanceToNow,
  differenceInDays,
  startOfDay,
  parseJSON,
} from 'date-fns';

const Item = ({
  item,
  item: { id, name, date, isDone },
  saveItem,
  deleteItem,
}) => {
  const [checked, setChecked] = useState(isDone);
  const [editMode, setEditMode] = useState(false);

  const toggleDone = () => {
    saveItem({ ...item, isDone: !isDone });
    setChecked(!checked);
  };

  const updateItem = (name, date, priority) => {
    const updatedItem = {
      ...item,
      name: name,
      date: startOfDay(date),
      priority: priority,
    };
    saveItem(updatedItem);
    setEditMode(false);
  };

  const formatDate = () => {
    switch (differenceInDays(parseJSON(date), startOfDay(new Date()))) {
      case -1:
        return 'yesterday';
      case 0:
        return 'today';
      case 1:
        return 'tomorrow';
      default:
        return formatDistanceToNow(parseJSON(date), { addSuffix: true });
    }
  };

  return (
    <li className='item'>
      {editMode ? (
        <EditItemForm item={item} updateItem={updateItem} />
      ) : (
        <>
          <div className='item-title squaredThree'>
            <input
              type='checkbox'
              id={id}
              defaultChecked={checked}
              onChange={toggleDone}
            />
            <label htmlFor={id} className={checked ? 'done' : undefined}>
              {name}
            </label>
          </div>
          <div className='due-date'>{formatDate()}</div>
        </>
      )}
      <div className='item-controls'>
        {editMode ? (
          <FaWindowClose
            className='item-edit'
            onClick={() => setEditMode(false)}
          />
        ) : (
          <FaEdit className='item-edit' onClick={() => setEditMode(true)} />
        )}
        <FaTrash className='item-delete' onClick={() => deleteItem(id)} />
      </div>
    </li>
  );
};

export default Item;
