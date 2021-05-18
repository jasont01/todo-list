import { useState, useEffect, useRef } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId =
  '344171521405-klhc88ki67nogdfpqp7fsb6tkjf3j4i8.apps.googleusercontent.com';

const User = ({ setTokenId, setLoadingData, isSignedIn, setIsSignedIn }) => {
  const [profile, setProfile] = useState();
  const [isActive, setIsActive] = useState(false);

  const node = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) return;
    setIsActive(false);
  };

  const onLogin = (res) => {
    setLoadingData(true);
    setTokenId(res.tokenId);
    setProfile(res.profileObj);
    setIsSignedIn(true);
  };

  const onLogout = () => {
    setLoadingData(true);
    setIsSignedIn(false);
    setTokenId();
    setProfile();
    setIsActive(false);
  };

  const onClick = () => {
    setIsActive(!isActive);
  };

  const onAutoLoadFinished = (signedIn) => {
    if (!signedIn) setIsSignedIn(false);
  };

  const showUserMenu = () => (
    <>
      <button onClick={onClick} className='menu-btn'>
        <span>{profile.givenName}</span>
        <img className='profile-img' src={profile.imageUrl} alt='avatar' />
      </button>
      <div className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <GoogleLogout
          clientId={clientId}
          buttonText='Logout'
          onLogoutSuccess={onLogout}
          icon={false}
          className='google-logout'
        />
      </div>
    </>
  );

  const showLoginBtn = () => (
    <GoogleLogin
      clientId={clientId}
      buttonText='Login'
      onSuccess={onLogin}
      onFailure={(res) => console.warn(res)}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      className='menu-btn'
      onAutoLoadFinished={onAutoLoadFinished}
    />
  );

  return (
    <div className='menu-container' ref={node}>
      {isSignedIn ? showUserMenu() : showLoginBtn()}
    </div>
  );
};

export default User;
