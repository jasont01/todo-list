const functions = require('firebase-functions');

const { OAuth2Client } = require('google-auth-library');

const clientId = functions.config().googleauth.client;
const clientSecret = functions.config().googleauth.secret;

const client = new OAuth2Client(clientId, clientSecret);

exports.googleAuth = async (token) => {
  const options = {
    idToken: token,
    audience: clientId,
  };

  try {
    const userId = await client
      .verifyIdToken(options)
      .then((ticket) => ticket.getPayload().sub);
    return userId;
  } catch {
    return null;
  }
};
