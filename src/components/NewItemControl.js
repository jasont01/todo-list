import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';
import NewItemForm from './NewItemForm';

const MAX_ITEMS = 10;

const NewItemControl = ({ createNewItem, numItems }) => {
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  return (
    <div className='controls'>
      {showNewItemForm ? (
        <NewItemForm
          createNewItem={createNewItem}
          cancelNewItem={() => setShowNewItemForm(false)}
          setShowNewItemForm={setShowNewItemForm}
        />
      ) : (
        <Button
          id='new-item-btn'
          disabled={numItems >= MAX_ITEMS}
          onClick={() => setShowNewItemForm(true)}
        >
          <FaPlus />
        </Button>
      )}
    </div>
  );
};

export default NewItemControl;
