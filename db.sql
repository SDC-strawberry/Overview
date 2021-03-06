create table products(
  id BIGSERIAL PRIMARY KEY,
  name varchar(64) not null,
  slogan varchar(1024),
  description varchar(1024) not null,
  category varchar(64) not null,
  default_price int not null -- price in US cents,
);

create table characteristics (
  id BIGSERIAL,
  product_id BIGINT,
  name varchar(64),
  FOREIGN KEY(product_id) REFERENCES products(id)
);

create table cart (
  id BIGSERIAL,
  user_session BIGINT,
  product_id BIGINT,
  active BOOLEAN default true,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

create table styles (
  id BIGSERIAL primary key,
  productId BIGINT,
  name varchar(64) not null,
  sale_price int, -- price in US dollars
  original_price int not null, -- price in US dollars
  default_style boolean not null default false,
  FOREIGN KEY(productId) REFERENCES products(id)
);

create table photos (
  id BIGSERIAL PRIMARY KEY,
  styleId BIGINT,
  url varchar(1024),
  thumbnail_url varchar(1024),
  FOREIGN KEY(styleId) REFERENCES styles(id)
);

create table skus (
  id BIGSERIAL PRIMARY KEY,
  style_id BIGINT,
  size varchar(8),
  quantity INT
);

create table carts (
  id bigint auto_increment not null primary key,
  source varchar(64) -- the ip address the cart was stored by, in dotted decimal notation.
);

create table related (
  current_product_id BIGINT,
  related_product_id BIGINT,
  FOREIGN KEY(current_product_id) REFERENCES products(id),
  FOREIGN KEY(related_product_id) REFERENCES products(id),
  PRIMARY KEY(current_product_id, related_product_id)
);

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT INDEX,
  rating smallint,
  date datetime,
  summary VARCHAR(1024),
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(1024),
  reviewer_email VARCHAR(1024),
  response BIGINT,
  helpfulness INT,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

create index product_id_index on styles (productid);
create index related_products on related(current_product_id);
CREATE INDEX sku_styles ON skus(style_id);
CREATE INDEX photo_styles ON photos(styleid);