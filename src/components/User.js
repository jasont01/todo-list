import { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId =
  '344171521405-klhc88ki67nogdfpqp7fsb6tkjf3j4i8.apps.googleusercontent.com';

const User = ({ setTokenId, setLoading }) => {
  const [profile, setProfile] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const onLogin = (res) => {
    setTokenId(res.tokenId);
    setProfile(res.profileObj);
    setIsSignedIn(true);
  };

  const onLogout = () => {
    setIsSignedIn(false);
    setTokenId();
    setProfile();
    setIsActive(false);
  };

  const onClick = () => {
    setIsActive(!isActive);
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
      onAutoLoadFinished={() => setLoading(false)}
    />
  );

  return (
    <div className='menu-container'>
      {isSignedIn ? showUserMenu() : showLoginBtn()}
    </div>
  );
};

export default User;
