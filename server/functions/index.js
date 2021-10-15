const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { getLists, saveList } = require('./APIs/lists');

const app = express();

app.use(cors());
app.use(bearerToken());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/', saveList);
app.get('/lists', getLists);

exports.api = functions.https.onRequest(app);
