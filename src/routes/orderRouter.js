const express = require('express');
const {loginRequired} = require('../utils/auth');
const orderController = require('../controllers/orderController');

const routes = express.Router();

routes.post('/buy', loginRequired, orderController.addBuyOrder)
routes.post('/addbuybid', loginRequired, orderController.addBuyBid)
routes.post('/sell', loginRequired, orderController.addSellOrder)
routes.post('/addsellbid', loginRequired, orderController.addSellBid)

module.exports = {
    routes
}
