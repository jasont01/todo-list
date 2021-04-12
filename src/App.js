import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Footer from './components/Footer';
import Lists from './components/Lists';

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

  return (
    <div className='App'>
      <div className='content'>
        <Header />

        <Lists lists={lists} setLists={setLists} />

        <Footer />
      </div>
    </div>
  );
};

export default App;
