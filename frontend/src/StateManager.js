import { useReducer } from 'react';

const initialState = {
  loading: true,
  isSignedIn: undefined,
  tokenId: undefined,
  profile: undefined,
  showMenu: false,
};

const reducer = (state, action) => {
  console.log({ state, action });
  switch (action.type) {
    case 'login':
      return {
        ...state,
        loading: true,
        isSignedIn: true,
        tokenId: action.payload.tokenId,
        profile: action.payload.profileObj,
      };
    case 'logout':
      return {
        ...state,
        loading: true,
        isSignedIn: false,
        tokenId: undefined,
        profile: undefined,
        showMenu: false,
      };
    case 'refreshToken':
      return { ...state, tokenId: action.payload };
    case 'autoLoadFinished':
      return action.payload ? { ...state } : { ...state, isSignedIn: false };
    case 'loadingDataFinished':
      return { ...state, loading: false };
    case 'toggleMenu':
      return { ...state, showMenu: action.payload };
    case 'hideMenu':
      return { ...state, showMenu: false };
    default:
      throw new Error();
  }
};

const StateManager = () => useReducer(reducer, initialState);

export default StateManager;
