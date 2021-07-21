-- GET /products
`select * from products
  where id > ${(page - 1) * count}
  limit ${count};`

-- GET /products/:product_id
`select * from products
  where id = ${product_id};`


-- GET /products/:product_id/styles
--   Run these queries and compose them into the JSON object:
--   After getting all the styles from the first query,
--   Run the second and third query for each.
`select * from styles
 WHERE productid=${product_id};`

`SELECT * from skus
  WHERE style_id=${style_id};`

`SELECT * FROM photos
  WHERE style_id=${style_id};`

-- GET /products/:product_id/related
`SELECT related_product_id FROM related
  WHERE current_product_id=${product_id};`

-- GET /reviews/
`SELECT
`

-- GET /reviews/meta
-- POST /reviews
-- PUT /reviews/:review_id/helpful
-- PUT /reviews/:review_id/report
