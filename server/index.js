require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId", "name", "price", "image", "shortDescription"
      from "products"
  `;

  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:id', (req, res, next) => {
  const { id } = req.params;
  if (id % 1 !== 0 || id < 1) { return next(new ClientError('Invalid request, ID must be a positive integer', 400)); }

  const sql = `
    select *
      from "products"
    where "productId" = $1
  `;

  db.query(sql, [id])
    .then(result => {
      if (result.rowCount === 0) { next(); }
      return res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const sql = `
    select
        "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartId" = $1
  `;

  if (!req.session.cartId) return res.json([]);
  db.query(sql, [req.session.cartId])
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  if (productId % 1 !== 0 || productId < 1) { return next(new ClientError('Invalid request, productId must be a positive integer', 400)); }
  const priceSql = `
    select "price"
      from "products"
      where "productId" = $1
  `;
  const cartSql = `
    insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"
  `;
  const cartItemsSql = `
    insert into "cartItems" ("cartId", "productId", "price", "quantity")
      values ($1, $2, $3, 1)
      returning "cartItemId"
  `;
  const responseSql = `
  select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartItemId" = $1
  `;

  db.query(priceSql, [productId])
    .then(result => {
      if (result.rowCount === 0) {
        throw new ClientError(`Product ID '${productId}' does not exist`, 404);
      }
      return result.rows[0];
    })
    .then(data => {
      if (req.session.cartId) {
        return ({ cartId: req.session.cartId, price: data.price });
      }
      return db.query(cartSql)
        .then(result => {
          return ({ cartId: result.rows[0].cartId, price: data.price });
        });
    })
    .then(cartObj => {
      req.session.cartId = cartObj.cartId;
      return db.query(cartItemsSql, [cartObj.cartId, productId, cartObj.price])
        .then(result => result.rows[0].cartItemId);
    })
    .then(cartItemId => {
      return db.query(responseSql, [cartItemId])
        .then(result => res.status(201).json(result.rows[0]));
    })
    .catch(err => next(err));

});

app.patch('/api/cart', (req, res, next) => {
  const { productId, quantity } = req.body;
  if (productId % 1 !== 0 || productId < 1) { return next(new ClientError('Invalid request, productId must be a positive integer', 400)); }
  if (quantity % 1 !== 0 || quantity < 1) { return next(new ClientError('Invalid request, quantity must be a positive integer', 400)); }

  const updateSql = `
    UPDATE "cartItems"
      SET quantity = $1
      WHERE (cartId = ${req.session.cartId} AND productId = ${productId}
      RETURNING *
  `;

  db.query(updateSql, [productId])
    .then(result => res.status(201).json(result.rows[0]));

});

app.post('/api/orders', (req, res, next) => {
  const { cartId } = req.session;
  if (!cartId) { return next(new ClientError('cartId does not exist', 400)); }

  const { name, creditCard, shippingAddress } = req.body;
  if (!(name && creditCard && shippingAddress)) { return next(new ClientError('Request must contain \'name\', \'creditCard\', and \'shippingAddress\'', 400)); }

  const orderSql = `
    insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
      values ($1, $2, $3, $4)
      returning "orderId", "createdAt", "name", "creditCard", "shippingAddress"
  `;
  const params = [cartId, name, creditCard, shippingAddress];

  db.query(orderSql, params)
    .then(result => {
      if (result.rows[0]) {
        delete req.session.cartId;
        res.status(201).json(result.rows[0]);
      }
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
