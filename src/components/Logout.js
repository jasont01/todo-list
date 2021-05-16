import GoogleLogout from 'react-google-login';

const clientId =
  '344171521405-klhc88ki67nogdfpqp7fsb6tkjf3j4i8.apps.googleusercontent.com';

const onSuccess = (res) => {
  console.log('[Logout Successfull]');
};

const Logout = () => {
  return (
    <GoogleLogout
      clientId={clientId}
      buttonText='Logout'
      onLogoutSuccess={onSuccess}
    />
  );
};

export default Logout;
