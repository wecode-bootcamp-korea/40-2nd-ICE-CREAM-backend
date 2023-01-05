const express = require('express');
const productController = require('../controllers/productController');

const routes = express.Router();

routes.get('', productController.getAllProducts)
routes.get('/main', productController.getAllProducts)
routes.get('/:productId', productController.getProductById)

module.exports = {
    routes 
}
