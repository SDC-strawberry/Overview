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
  }

  getProducts(res, req, getProductsReplyCallback, page, count) {
    console.log('page', page);
    console.log('count', count);
    let minId = (parseInt(page) - 1) * parseInt(count);
    console.log('minId: ', minId);
    let query = `select * from products
      where id > ${minId}
      order by id asc
      limit ${count};`
    console.log('query: ', query);
    pool.query(query, (err, data) => {
      if (err) { console.log('Error: ', err); }
      getProductsReplyCallback(err, data.rows, res, req);
    });
  }

  getProductById(res, req, getProductByIdReplyCallback, productId) {
    let query = `select * from products
      where id = ${productId};`
    pool.query(query, (err, data) => {
      if (err) { console.log('Error: ', err); }
      getProductByIdReplyCallback(err, data.rows, res, req);
    });
  }
}

module.exports = new Db;