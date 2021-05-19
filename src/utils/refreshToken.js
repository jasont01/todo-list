export const refreshTokenSetup = (res, dispatch) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();

    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    dispatch({ type: 'refreshToken', payload: newAuthRes.id_token });

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};
