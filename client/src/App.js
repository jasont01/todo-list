import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import User from './components/User';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ListManager from './components/ListManager';
import StateManager from './StateManager';

const STORAGE_KEY = 'todo-lists';
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
  const [state, dispatch] = StateManager();
  const [lists, setLists] = useState(DEFAULT_LIST);

  useEffect(() => {
    if (state.isSignedIn === undefined) return;
    if (state.isSignedIn) {
      axios
        .get(`${API_URL}/lists`, {
          headers: { Authorization: `Bearer ${state.tokenId}` },
        })
        .then((res) => {
          if (res.data) setLists(res.data);
          dispatch({ type: 'loadingDataFinished' });
        })
        .catch((err) => console.error(err));
    } else {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data) setLists(data);
      dispatch({ type: 'loadingDataFinished' });
    }
  }, [state.isSignedIn]);

  const saveLists = (data) => {
    state.isSignedIn
      ? axios
          .post(
            API_URL,
            { lists: data },
            { headers: { Authorization: `Bearer ${state.tokenId}` } }
          )
          .catch((err) => console.error(err))
      : localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLists(data);
  };

  return (
    <div className='App'>
      <User state={state} dispatch={dispatch} />
      <div className='content'>
        <Header />
        <Loader loading={state.loading} />
        <ListManager
          lists={lists}
          setLists={saveLists}
          loading={state.loading}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;
