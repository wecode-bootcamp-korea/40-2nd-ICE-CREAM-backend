const express = require('express');
const postController = require('../controllers/postController')

const routes = express.Router();

routes.get('/details', postController.getPostDetail);
routes.get('/',postController.getPostByFilter);

module.exports = { routes };