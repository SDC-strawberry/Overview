-- GET /products
`select * from products
  where id > ${(page - 1) * count}
  limit ${count};`

-- GET /products/:product_id
`select * from products
  where id = ${product_id};`


-- GET /products/:product_id/styles
`select * from styles
 WHERE productid=${product_id};`

-- GET /products/:product_id/related
`SELECT related_product_id FROM related
  WHERE current_product_id=${product_id};`

-- GET /reviews/
-- GET /reviews/meta
-- POST /reviews
-- PUT /reviews/:review_id/helpful
-- PUT /reviews/:review_id/report
