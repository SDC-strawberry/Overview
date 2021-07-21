require('dotenv').config();
const express = require('express');
const app = express()
const port = 3000
const Db = require('./db/db.js')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

const getProductsReplyCallback = function(err, data, res, req) {
  if (err) { res.send(err); }
  else res.send(data);
}

app.get('/', (req, res) => {
  Db.testQuery();
  res.send('Hello World');
});

app.get('/products', (req, res) => {
  let page = req.query.page;
  let count = req.query.count;
  Db.getProducts(res, req, getProductsReplyCallback, page, count);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});