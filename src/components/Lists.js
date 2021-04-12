import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import NewListForm from './NewListForm';
import List from './List';
import Items from './Items';

const MAX_LISTS = 18;

const Lists = ({ lists, setLists }) => {
  const [activeList, setActiveList] = useState(
    lists.find((list) => list.active).id || lists[0].id
  );
  const [showNewListForm, setShowNewListForm] = useState(false);

  useEffect(() => {
    const data = lists.map((list) =>
      list.id === activeList
        ? { ...list, active: true }
        : { ...list, active: false }
    );
    setLists(data);
  }, [activeList]);

  const createNewList = (title) => {
    const newList = {
      id: nanoid(),
      name: title,
      items: [],
      active: false,
    };
    setLists([...lists, newList]);
    setShowNewListForm(false);
  };

  const saveList = (updatedList) => {
    const data = lists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    setLists(data);
  };

  const deleteList = (id, name) => {
    confirmAlert({
      title: `Delete ${name}`,
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Delete',
          className: 'btn btn-danger',
          onClick: () => setLists(lists.filter((list) => list.id !== id)),
        },
        {
          label: 'Cancel',
          className: 'btn btn-primary',
        },
      ],
    });
  };

  return (
    <>
      <div className='list-container'>
        <h3 className='lists-header'>-Lists-</h3>
        <ul className='lists'>
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              changeActive={setActiveList}
              onlyList={lists.length < 2}
              saveList={saveList}
              deleteList={deleteList}
            />
          ))}
        </ul>

        {showNewListForm ? (
          <NewListForm
            createNewList={createNewList}
            cancelNewList={() => setShowNewListForm(false)}
          />
        ) : (
          <Button
            disabled={lists.length >= MAX_LISTS}
            onClick={() => setShowNewListForm(true)}
          >
            new list
          </Button>
        )}
      </div>
      <Items
        list={lists.find((list) => list.id === activeList)}
        saveList={saveList}
      />
    </>
  );
};

export default Lists;
