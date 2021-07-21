require('dotenv').config();
const express = require('express');
const app = express()
const port = 3000
const Db = require('./db/db.js')


app.get('/', (req, res) => {
  Db.testQuery();
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});