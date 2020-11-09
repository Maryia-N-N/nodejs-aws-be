export const PRODUCTS = 'SELECT products.id, products.title, products.description, products.price, stocks.count from products INNER JOIN stocks ON products.id=stocks.product_id';
export const PRODUCT_BY_ID = 'SELECT products.id, products.title, products.description, products.price, stocks.count from products INNER JOIN stocks ON products.id=stocks.product_id WHERE products.id = $1::uuid';
export const INSERT_PRODUCT = 'INSERT INTO products(title, description, price) VALUES($1::text, $2::text, $3::integer) RETURNING id';
export const INSERT_STOCK = 'INSERT INTO stocks(product_id, countsr) VALUES($1::uuid, $2::integer) RETURNING id';
