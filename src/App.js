import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ListManager from './components/ListManager';

const STORAGE_KEY = 'todo-lists';
//const SERVER_URL = 'http://localhost:5000';
const SERVER_URL = 'https://calm-savannah-28337.herokuapp.com';

const DEFAULT_LIST = [
  {
    id: nanoid(),
    name: 'Default List',
    items: [],
    active: true,
  },
];

const App = () => {
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const [userId, setUserId] = useState('123abc');
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState();

  useEffect(() => {
    if (useLocalStorage) {
      setLists(JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_LIST);
      setLoading(false);
    } else {
      axios
        .get(`${SERVER_URL}/lists?userId=${userId}`)
        .then((res) => {
          setLists(res.data ? res.data : DEFAULT_LIST);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [useLocalStorage, userId]);

  useEffect(() => {
    if (loading) return;
    useLocalStorage
      ? localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
      : axios
          .post(SERVER_URL, { userId: userId, lists: lists })
          .catch((err) => console.error(err));
  }, [lists, loading, useLocalStorage, userId]);

  return (
    <div className='App'>
      <div className='content'>
        <Header />
        <Loader loading={loading} />
        <ListManager lists={lists} setLists={setLists} loading={loading} />
        <Footer />

        <button
          onClick={() => {
            setLoading(true);
            setUseLocalStorage(!useLocalStorage);
          }}
        >
          {`localStorage: ${useLocalStorage}`}
        </button>
      </div>
    </div>
  );
};

export default App;
