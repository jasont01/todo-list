import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import User from './components/User';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ListManager from './components/ListManager';

const STORAGE_KEY = 'todo-lists';
//const API_URL = 'http://localhost:5000/todo-list-313916/us-central1/api';
const API_URL = 'https://us-central1-todo-list-313916.cloudfunctions.net/api';

const DEFAULT_LIST = [
  {
    id: nanoid(),
    name: 'Default List',
    items: [],
    active: true,
  },
];

const App = () => {
  const [lists, setLists] = useState(DEFAULT_LIST);
  const [loadingData, setLoadingData] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState();
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    if (isSignedIn === undefined) return;
    if (isSignedIn) {
      axios
        .get(`${API_URL}/lists`, {
          headers: { Authorization: `Bearer ${tokenId}` },
        })
        .then((res) => {
          if (res.data) setLists(res.data);
          setLoadingData(false);
        })
        .catch((err) => console.error(err));
    } else {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data) setLists(data);
      setLoadingData(false);
    }
  }, [isSignedIn]);

  const saveLists = (data) => {
    isSignedIn
      ? axios
          .post(
            API_URL,
            { lists: data },
            { headers: { Authorization: `Bearer ${tokenId}` } }
          )
          .catch((err) => console.error(err))
      : localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLists(data);
  };

  return (
    <div className='App'>
      <User
        setTokenId={setTokenId}
        setLoadingData={setLoadingData}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <div className='content'>
        <Header />
        <Loader loading={loadingData} />
        <ListManager lists={lists} setLists={saveLists} loading={loadingData} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
