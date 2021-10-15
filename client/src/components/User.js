import { useEffect, useRef } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken.js';

const clientId =
  '344171521405-klhc88ki67nogdfpqp7fsb6tkjf3j4i8.apps.googleusercontent.com';

const User = ({ state: { isSignedIn, profile, showMenu }, dispatch }) => {
  const node = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showMenu]);

  const handleClick = (e) => {
    if (!showMenu || node.current.contains(e.target)) return;
    dispatch({ type: 'hideMenu' });
  };

  const onLogin = (res) => {
    refreshTokenSetup(res, dispatch);
    dispatch({ type: 'login', payload: res });
  };

  const UserMenu = () => (
    <>
      <button
        onClick={() => dispatch({ type: 'toggleMenu', payload: !showMenu })}
        className='menu-btn'
      >
        <span>{profile.givenName}</span>
        <img className='profile-img' src={profile.imageUrl} alt='avatar' />
      </button>
      <div className={`menu ${showMenu ? 'active' : 'inactive'}`}>
        <GoogleLogout
          clientId={clientId}
          buttonText='Logout'
          onLogoutSuccess={() => dispatch({ type: 'logout' })}
          icon={false}
          className='google-logout'
        />
      </div>
    </>
  );

  const LoginBtn = () => (
    <GoogleLogin
      clientId={clientId}
      buttonText='Login'
      onSuccess={onLogin}
      onFailure={(res) => console.warn(res)}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      className='menu-btn'
      onAutoLoadFinished={(res) =>
        dispatch({ type: 'autoLoadFinished', payload: res })
      }
    />
  );

  return (
    <div className='menu-container' ref={node}>
      {isSignedIn ? UserMenu() : LoginBtn()}
    </div>
  );
};

export default User;