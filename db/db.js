const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

class Db {
  testQuery() {
    pool.query('select * from products where id=5;', (err, res) => {
      console.log('Error: ', err);
      console.log('Response: ', res);
    });
    pool.end();
  }
}

module.exports = new Db;