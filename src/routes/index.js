const express = require(“express”);
const routes = express.Router();
const userRouter = require(‘./userRouter’)
const productRouter = require(‘./productRouter’)
const postRouter = require(‘./postRouter’)
routes.use(‘/users’, userRouter.routes)
routes.use(‘/products’, productRouter.routes)
routes.use(‘/posts’, postRouter.routes);
module.exports = routes;