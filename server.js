require('dotenv').config();
const express = require('express');
const app = express()
const port = 3000
const db = require('./db/db.js')

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});