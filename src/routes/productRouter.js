const express = require('express');
const productController = require('../controllers/productController');

const routes = express.Router();

routes.get('/:productId', productController.getProductById)

module.exports = {
    routes 
}
