import { nanoid } from 'nanoid';
import { confirmAlert } from 'react-confirm-alert';
import List from './List';
import NewListControl from './NewListControl';

const Lists = ({ lists, setLists, saveList, setActiveList }) => {
  const createNewList = (title) => {
    const newList = {
      id: nanoid(),
      name: title,
      items: [],
      active: false,
    };
    setLists([...lists, newList]);
  };

  const confirmDelete = (id, name) => {
    confirmAlert({
      title: `Delete ${name}`,
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Delete',
          className: 'btn btn-danger',
          onClick: () => deleteList(id),
        },
        {
          label: 'Cancel',
          className: 'btn btn-primary',
        },
      ],
    });
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
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
            deleteList={confirmDelete}
          />
        ))}
      </ul>
      <NewListControl createNewList={createNewList} numLists={lists.length} />
    </div>
  );
};

export default Lists;
