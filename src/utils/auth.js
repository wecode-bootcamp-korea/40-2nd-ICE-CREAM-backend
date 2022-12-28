const jwt = require('jsonwebtoken')
const userDao = require('../models/userDao')
const { catchAsync } = require('../utils/error')

const loginRequired = catchAsync(async (req, res, next) => {

    const accessToken = req.headers.authorization

    if (!accessToken) throw new Error('accessTokenErr')
    
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    
    const user = await userDao.getUserByKakaoId(decoded.id)
    
    if (!user) throw new Error('getUserByKakaoIdErr')

    req.user = user;
    next();
})

module.exports = { loginRequired }