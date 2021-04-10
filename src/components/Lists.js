import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import List from './List';
import Items from './Items';

const Lists = ({ lists, setLists }) => {
  const [activeList, setActiveList] = useState(
    lists.find((list) => list.active) || lists[0].id
  );
  //const [activeListItems, setActiveListItems] = useState([]);

  useEffect(() => {
    const data = lists.map((list) =>
      list.id === activeList.id
        ? { ...list, active: true }
        : { ...list, active: false }
    );
    setLists(data);
  }, [activeList]);

  // useEffect(() => {
  //   const active = lists.find((list) => list.id === activeList);
  //   console.log('setting activeListItems', { active, activeList, lists });
  //   setActiveListItems(active.items);
  // }, [activeList, lists]);

  const changeActive = (id) => {
    const active = lists.find((list) => list.id === id);
    setActiveList(active);
  };

  return (
    <>
      <div className='list-container'>
        <h3 className='lists-header'>-Lists-</h3>
        <ul className='lists'>
          {lists.map((list) => (
            <List key={list.id} list={list} changeActive={changeActive} />
          ))}
        </ul>

        <form className='new-list-form inactive'>
          <input
            className='form-control form-control-sm'
            type='text'
            id='new-list-name'
            placeholder='List Name'
          />
          <button
            type='submit'
            id='new-list-add'
            className='btn btn-sm btn-primary'
            aria-label='add new list'
          >
            Add
          </button>
          <button
            type='reset'
            id='new-list-cancel'
            className='btn btn-sm btn-secondary'
            aria-label='cancel new list'
          >
            cancel
          </button>
        </form>

        <Button variant='primary'>new list</Button>
      </div>

      <Items items={activeList.items} />
    </>
  );
};

export default Lists;
