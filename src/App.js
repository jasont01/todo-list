import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Loader from './components/Loader';
import ListManager from './components/ListManager';

const STORAGE_KEY = 'todo-lists';
const SERVER_URL = 'http://localhost:5000';
//const SERVER_URL = 'https://calm-savannah-28337.herokuapp.com';

const DEFAULT_LIST = [
  {
    id: nanoid(),
    name: 'Default List',
    items: [],
    active: true,
  },
];

const App = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenId, setTokenId] = useState();
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState();

  useEffect(() => {
    if (tokenId) {
      axios
        .get(`${SERVER_URL}/lists`, {
          headers: { Authorization: `Bearer ${tokenId}` },
        })
        .then((res) => {
          setLists(res.data ? res.data : DEFAULT_LIST);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } else {
      setLists(JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_LIST);
      setLoading(false);
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
  }, [lists, loading, tokenId]);

  return (
    <div className='App'>
      <Navbar setTokenId={setTokenId} />
      <div className='content'>
        <Header />
        <Loader loading={loading} />
        <ListManager lists={lists} setLists={setLists} loading={loading} />
        <Footer />
        {/* <Login setTokenId={setTokenId} /> */}
      </div>
    </div>
  );
};

export default App;
