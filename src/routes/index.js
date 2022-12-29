const express = require("express");

const routes = express.Router();

const userRouter = require('./userRouter')

routes.use('/users', userRouter.routes)

module.exports = routes;