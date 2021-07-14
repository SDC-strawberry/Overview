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