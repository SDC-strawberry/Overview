const { Pool } = require('pg');
const { _ } = require('underscore');

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
        resolve(data.rows[0]);
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
        where style_id = ${styleId};`
      pool.query(query, (err, data) => {
        if (err) { reject(err); }
        resolve(data.rows);
      });
    });
  }

  promisedGetRelated(productId) {
    return new Promise((resolve, reject) => {
      let query = `select * from related
        where current_product_id = ${productId};`
      pool.query(query, (err, data) => {
        if (err) { reject(err); }
        let ids = data.rows.map((row) => {return row.related_product_id});
        resolve(ids);
      });
    });
  }

  getPhotosFor(productId) {
    return new Promise((resolve, reject) => {
      let query = `
        select *
        from photos
        where styleid in
        (
          select id
          from styles
          where productId = ${productId}
        );`
        pool.query(query, (err, data) => {
          if (err) { reject(err); }
          resolve(data.rows);
      });
    });
  }

  getSkusFor(productId) {
    return new Promise((resolve, reject) => {
      let query = `
        select *
        from skus
        where style_id in
        (
          select id
          from styles
          where productId = ${productId}
        );`
        pool.query(query, (err, data) => {
          if (err) { reject(err); }
          resolve(data.rows);
      });
    });
  }

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
    let photos = this.getPhotosFor(productId);
    let skus = this.getSkusFor(productId);
    return Promise.all([product, styles, skus, photos])
      .then((values) => {
        let product = values[0];
        let styles = values[1];
        let skus = values[2];
        let photos = values[3];
        let style_skus = _.groupBy(skus, (sku) => sku.style_id);
        let style_photos = _.groupBy(photos, (photo) => photo.styleid);
        for (let style of styles) {
          style.photos = style_photos[style.id];
          style.skus = style_skus[style.id];
        }
        product.styles = styles;
        return product;
      })
  }
}

module.exports = new Db;