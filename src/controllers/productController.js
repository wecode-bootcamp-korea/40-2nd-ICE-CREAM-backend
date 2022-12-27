const { query } = require('express')
const productService = require('../services/productService')
const { catchAsync } = require('../utils/error')

const getProductById = catchAsync(async (req, res) => {
    const productId = +req.params.productId
    const result = await productService.getProductById(productId)
    res.status(200).json({ data : result })
})

module.exports = {
    getProductById
}