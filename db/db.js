const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

class Db {
  testJest() {
    return 1;
  };

  closePool() {
    pool.end();
  }

  promisedGetProductById(productId) {
    return new Promise((resolve, reject) => {
      let query = `select * from products
        where id = ${productId};`
      pool.query(query, (err, data) => {
        if (err) { reject(err); }
        resolve(data.rows);
      });
    });
  }

  promisedGetStyles(productId) {
    return new Promise((resolve, reject) => {
      let query = `select * from styles
        where productId = ${productId};`
      pool.query(query, (err, data) => {
        if (err) { reject(err); }
        resolve(data.rows);
      });
    });
  }

  promisedGetPhotos(styleId) {
    return new Promise((resolve, reject) => {
      let query = `select * from photos
        where styleId = ${styleId};`
      pool.query(query, (err, data) => {
        if (err) { reject(err); }
        resolve(data.rows);
      });
    });
  }
  promisedGetSkus(styleId) {
    return new Promise((resolve, reject) => {
      let query = `select * from skus
        where styleId = ${styletId};`
      pool.query(query, (err, data) => {
        if (err) { reject(err); }
        resolve(data.rows);
      });
    });
  }

  testQuery() {
    pool.query('select * from products where id=5;', (err, res) => {
      console.log('Error: ', err);
      console.log('Response: ', res);
    });
  };

  getProducts(res, req, getProductsReplyCallback, page, count) {
    let minId = (parseInt(page) - 1) * parseInt(count);
    let query = `select * from products
      where id > ${minId}
      order by id asc
      limit ${count};`
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

  getProductStylesById(productId) {
    let product = this.promisedGetProductById(productId);
    let styles = this.promisedGetStyles(productId);
    return Promise.all([product, styles])
      .then((values) => {
        //console.log('After promise.all, values: ', values)
        return values;
      })
  }
}

module.exports = new Db;