const express = require("express");
const routes = express.Router();

const userRouter = require('./userRouter')
const productRouter = require('./productRouter');

routes.use('/users', userRouter.routes)
routes.use('/products', productRouter.routes);

module.exports = routes;