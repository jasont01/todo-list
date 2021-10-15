const { db } = require('../utils/admin');
const { googleAuth } = require('../utils/google-auth');

exports.getLists = (req, res) => {
  googleAuth(req.token).then((userId) => {
    if (!userId) return res.status(500).send('Error: Invalid tokenId');
    db.collection('lists')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.json(doc.data().lists);
        } else {
          return res.send();
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
};

exports.saveList = (req, res) => {
  googleAuth(req.token).then((userId) => {
    if (!userId) return res.status(500).send('Error: Invalid tokenId');
    db.collection('lists')
      .doc(userId)
      .set(req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
};
