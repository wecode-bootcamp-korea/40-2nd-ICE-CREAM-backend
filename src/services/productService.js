const productDao = require('../models/productDao')

const getProductById = async (productId) => {
    try {
        const productData = await productDao.getConstantProductDataById(productId)
        const tradeAll = await productDao.getProductTradeDataById(productId)
        const chartData = await productDao.getProductChartDataById(productId)

        return {
            productData,
            tradeAll: tradeAll[0],
            tradeLimit: tradeAll[1],
            chartData
        }
    } catch {
        throw new Error('getProductByIdErr')
    }
}

module.exports = {
    getProductById
}