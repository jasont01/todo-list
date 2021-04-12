import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import NewListForm from './NewListForm';

const MAX_LISTS = 18;

const NewListControl = ({ createNewList, numLists }) => {
  const [showNewListForm, setShowNewListForm] = useState(false);

  return (
    <>
      {showNewListForm ? (
        <NewListForm
          createNewList={createNewList}
          cancelNewList={() => setShowNewListForm(false)}
          setShowNewListForm={setShowNewListForm}
        />
      ) : (
        <Button
          disabled={numLists >= MAX_LISTS}
          onClick={() => setShowNewListForm(true)}
        >
          new list
        </Button>
      )}
    </>
  );
};

export default NewListControl;
