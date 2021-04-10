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
        items: [
          {
            id: 1,
            title: 'test',
            date: '1980-01-01T04:00:00.000Z',
            priority: 'none',
            isDone: false,
          },
        ],
        active: true,
      },
      {
        id: nanoid(),
        name: 'My List',
        items: [
          {
            id: 1,
            title: 'monkey',
            date: '1998-06-10T04:00:00.000Z',
            priority: 'high',
            isDone: true,
          },
        ],
        active: false,
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

        {/* <div className="controls">
          ---NewItemForm---
          <button id="new-item-btn" className="btn btn-primary" aria-label="new item"><i className="fas fa-plus"></i></button>
        </div> */}

        <Footer />
      </div>
    </div>
  );
};

export default App;
