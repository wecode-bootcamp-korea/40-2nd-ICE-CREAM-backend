const orderDao = require('../models/orderDao')

const addBuyOrder = async (productId, size, price, userId) => {
    if (size == '') {
        size = 'na'
    }
    return await orderDao.addBuyOrder(productId, size, price, userId)
}

const addBuyBid = async (productId, size, price, userId) => {
    if (size == '') {
            size = 'na'
        }
    return await orderDao.addBuyBid(productId, size, price, userId)
}

const addSellOrder = async (productId, size, price, userId) => {
    if (size == '') {
        size = 'na'
    }
    return await orderDao.addSellOrder(productId, size, price, userId)
}

const addSellBid = async (productId, size, price, userId) => {
    if (size == '') {
        size = 'na'
    }
    return await orderDao.addSellBid(productId, size, price, userId)
}

module.exports = {
    addBuyOrder,
    addBuyBid,
    addSellOrder,
    addSellBid
}