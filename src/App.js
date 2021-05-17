import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import User from './components/User';
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
  const [tokenId, setTokenId] = useState();
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_LIST
  );

  useEffect(() => {
    if (loading) return;
    if (tokenId) {
      axios
        .get(`${SERVER_URL}/lists`, {
          headers: { Authorization: `Bearer ${tokenId}` },
        })
        .then((res) => {
          setLists(res.data ? res.data : DEFAULT_LIST);
        })
        .catch((err) => console.error(err));
    } else {
      setLists(JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_LIST);
    }
  }, [tokenId]);

  useEffect(() => {
    if (loading) return;
    tokenId
      ? axios
          .post(
            SERVER_URL,
            { lists: lists },
            { headers: { Authorization: `Bearer ${tokenId}` } }
          )
          .catch((err) => console.error(err))
      : localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  return (
    <div className='App'>
      <User setTokenId={setTokenId} setLoading={setLoading} />
      <div className='content'>
        <Header />
        <Loader loading={loading} />
        <ListManager lists={lists} setLists={setLists} loading={loading} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
