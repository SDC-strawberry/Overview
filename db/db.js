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

  promisedGetProductById() {
    return new Promise((resolve, reject) => {
      let query = `select * from products
        where id = 1;`
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

  getProductStylesById(res, req, getProductByIdReplyCallback, productId) {
    let productQuery = `select * from products
      where id = ${productId};`;
    let styleQuery = `select * from styles
      WHERE productid=${product_id};`;
    let skuQuery = `SELECT * from skus
       WHERE style_id=${style_id};`;
    let photoQuery = `SELECT * FROM photos
       WHERE style_id=${style_id};`;

    pool.query(productQuery, (err, productData) => {
      // Replace this with promisified calls;
      // SKUs and Photos belong to each style, so the first query
      // to products has to return first. Then, for each style, its
      // skus and photos are retrieved, and added to that style object
      // Only once all styles's sub-promises are resolved do we add the styles
      // to the main product info and return it.
    });
  }
}

module.exports = new Db;