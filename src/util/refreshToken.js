export const refreshTokenSetup = (res, dispatch) => {
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();

    dispatch({ type: 'refreshToken', payload: newAuthRes.id_token });

    setTimeout(refreshToken, newAuthRes.expires_in);
  };

  setTimeout(refreshToken, res.tokenObj.expires_in);
};
