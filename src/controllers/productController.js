const productService = require('../services/productService')
const { catchAsync } = require('../utils/error')

const getProductById = catchAsync(async (req, res) => {
    const productId = +req.params.productId
    const result = await productService.getProductById(productId)
    res.status(200).json({ data : result })
})

const getAllProducts = catchAsync(async (req, res) => {
    const {categoryId, size, orderBy} = req.query
        const data = await productService.getAllProducts(categoryId, size, orderBy)
        res.status(200).json({ data })
})

module.exports = {
    getProductById,
    getAllProducts
}