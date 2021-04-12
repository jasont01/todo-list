import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Footer from './components/Footer';
import Lists from './components/Lists';
import Items from './components/Items';

const STORAGE_KEY = 'todo-lists';

const App = () => {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
      {
        id: nanoid(),
        name: 'Default List',
        items: [],
        active: true,
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const getActiveList = () => {
    let activeList = lists.find((list) => list.active);
    if (!activeList) {
      activeList = lists[0];
      setActiveList(activeList.id);
    }
    return activeList;
  };

  const setActiveList = (id) => {
    const data = lists.map((list) =>
      list.id === id ? { ...list, active: true } : { ...list, active: false }
    );
    setLists(data);
  };

  const saveList = (updatedList) => {
    const data = lists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    setLists(data);
  };

  return (
    <div className='App'>
      <div className='content'>
        <Header />
        <Lists
          lists={lists}
          setLists={setLists}
          saveList={saveList}
          setActiveList={setActiveList}
        />
        <Items list={getActiveList()} saveList={saveList} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
