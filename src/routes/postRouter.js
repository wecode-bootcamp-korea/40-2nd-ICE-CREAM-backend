const express = require('express');
const postController = require('../controllers/postController')

const routes = express.Router();

routes.get("/", postController.getPostByFilter);
routes.get("/details", postController.getPostDetail);

module.exports = { routes };