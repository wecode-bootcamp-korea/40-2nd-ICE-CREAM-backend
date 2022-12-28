const orderService = require('../services/orderService')
const { catchAsync } = require('../utils/error')

const addBuyOrder = catchAsync(async (req, res) => {
    const {productId, size, price} = req.body;
    if (!productId || !price) { 
        throw new Error('keyErr')
    }
    const userId = req.user.id
    await orderService.addBuyOrder(productId, size, price, userId)
    res.status(201).json({ data : "ORDER_COMPLETE" })
})

const addBuyBid = catchAsync(async (req, res) => {
    const {productId, size, price} = req.body;
    const userId = req.user.id
    await orderService.addBuyBid(productId, size, price, userId)
    res.status(201).json({ data : "BID_ADDED" })
})

const addSellOrder = catchAsync(async (req, res) => {
    const {productId, size, price} = req.body;
    const userId = req.user.id
    await orderService.addSellOrder(productId, size, price, userId)
    res.status(201).json({ data : "SELL_COMPLETE" })
})

const addSellBid = catchAsync(async (req, res) => {
    const {productId, size, price} = req.body;
    const userId = req.user.id
    await orderService.addSellBid(productId, size, price, userId)
    res.status(201).json({ data : "BID_ADDED" })
})

module.exports = {
    addBuyOrder,
    addBuyBid,
    addSellOrder,
    addSellBid
}