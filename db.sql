create table products(
  id bigint not null auto_increment primary key,
  name varchar(64) not null,
  slogan varchar(1024) not null,
  description varchar(1024) not null,
  category varchar(64) not null,
  default_price int not null -- price in US cents,
);

create table features (
	id bigint PRIMARY KEY NOT NULL auto_increment,
  feature varchar(64),
  value varchar(64)
);

create table l_features_products (
  feature_id bigint,
  product_id bigint,
  primary key (feature_id, product_id),
  constraint fk_feature foreign key (feature_id) references features(id),
  constraint fk_product foreign key (product_id) references products(id)
);

create table styles (
  id bigint auto_increment not null primary key,
  name varchar(64) not null,
  sale_price int not null, -- price in US cents
  is_default boolean not null default false
);

create table photos (
  id bigint auto_increment not null primary key,
  thumbnail_url varchar(256),
  url varchar(256)
);

create table skus (
  id bigint auto_increment not null primary key,
  quantity int,
  size varchar(16)
);

create table l_photos_styles (
  photo_id bigint ,
  style_id bigint,
  primary key (photo_id, style_id),
  constraint fk_photo foreign key (photo_id) references photos(id),
  constraint fk_style_photo foreign key (style_id) references styles(id)
);

create table l_skus_styles (
  sku_id bigint,
  style_id bigint,
  primary key (sku_id, style_id),
  constraint fk_sku foreign key (sku_id) references skus(id),
  constraint fk_style foreign key (style_id) references styles(id)
);

create table carts (
  id bigint auto_increment not null primary key,
  source varchar(64) -- the ip address the cart was stored by, in dotted decimal notation.
);

create table intended_purchases (
  id bigint auto_increment not null primary key,
  cart_id bigint not null,
  sku_id bigint not null,
  count int not null,
  constraint fk_cart_id foreign key (cart_id) references carts(id)
);