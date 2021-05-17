import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId =
  '344171521405-klhc88ki67nogdfpqp7fsb6tkjf3j4i8.apps.googleusercontent.com';

const Navbar = ({ setTokenId }) => {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res);
    setTokenId(res.tokenId);
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <div className='navbar'>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        className='google-btn'
      />
    </div>
  );
};

export default Navbar;
