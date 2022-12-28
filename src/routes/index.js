const express = require("express");
const routes = express.Router();

const userRouter = require('./userRouter')
const productRouter = require('./productRouter');
const postRouter = require('./postRouter');
const orderRouter = require('./orderRouter');

routes.use('/users', userRouter.routes)
routes.use('/products', productRouter.routes);
routes.use('/posts', postRouter.routes);
routes.use('/orders', orderRouter.routes);

module.exports = routes;