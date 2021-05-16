import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId =
  '344171521405-klhc88ki67nogdfpqp7fsb6tkjf3j4i8.apps.googleusercontent.com';

const Login = ({ setTokenId }) => {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res);
    setTokenId(res.tokenId);
    //setIsLoggedIn(true);
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  const style = { marginTop: '100px' };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText='Login'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      style={style}
      isSignedIn={true}
    />
  );
};

export default Login;
