require('dotenv').config();
const express = require('express');
const app = express()
const port = 3000
const Db = require('./db/db.js')

const getProductsReplyCallback = function(err, data, res, req) {
  if (err) { res.send(err); }
  else res.send(data);
}

app.get('/', (req, res) => {
  Db.testQuery();
  res.send('Hello World');
});

app.get('/products', (req, res) => {
  let page = 1;
  let count = 5;
  Db.getProducts(res, req, getProductsReplyCallback, page, count);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});