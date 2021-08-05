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
  res.send('Hello World');
});

app.get('/promise', (req, res) => {
  db.promisedGetProductById(1)
    .then((data) => {
      res.send(data[0])
    })
    .catch((err) => {
      res.send(500);
      console.log('Error: ', err)}
    );
})

app.get('/promiseStyles', (req, res) => {
  db.promisedGetStyles(1)
    .then((data) => {
      res.send(data)
      console.log('Promise reply: ', data)}
    )
    .catch((err) => {
      res.send(500);
      console.log('Error: ', err)}
    );
})

app.get('/products', (req, res) => {
  let page = req.query.page;
  let count = req.query.count;
  db.getProducts(res, req, generalReplyCallback, page, count);
});

app.get('/products/:productId', (req, res) => {
  db.getProductById(res, req, generalReplyCallback, req.params.productId);
});

app.get('/products/:productId/styles', (req, res) => {
  db.getProductStylesById(req.params.productId)
    .then((fullProductStyles) => {
      res.send(fullProductStyles);
    })
})

app.get('/products/:productId/related', (req, res) => {
  db.promisedGetRelated(req.params.productId)
    .then((relatedProductIds) => {
      res.send(relatedProductIds);
    })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});