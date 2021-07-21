console.log('Included')
const { Pool } = require('pg');

const pool = new Pool();

pool.query('SELECT NOW()', (err, res) => {
  console.log('Error: ', err);
  console.log('Response: ', res);
});
pool.end()