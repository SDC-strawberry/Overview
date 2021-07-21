require('dotenv').config();
const express = require('express');
const app = express()
const port = 3000
const db = require('./db/db.js')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

const generalReplyCallback = function(err, data, res, req) {
  if (err) { res.send(err); }
  else res.send(data);
}

app.get('/', (req, res) => {
  db.testQuery();
  res.send('Hello World');
});

app.get('/products', (req, res) => {
  let page = req.query.page;
  let count = req.query.count;
  db.getProducts(res, req, generalReplyCallback, page, count);
});

app.get('/products/:productId', (req, res) => {
  db.getProductById(res, req, generalReplyCallback, req.params.productId);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});