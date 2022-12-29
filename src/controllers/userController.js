const userService = require('../services/userService');
const { catchAsync } = require('../utils/error')

const kakaoLogin = catchAsync(async (req, res) => {
    const authCode = req.query.code;

        if (!authCode) throw new Error('authCodeErr');

    const accessToken = await userService.kakaoLogin(authCode);
    res.json({accessToken: accessToken})
})

module.exports = {
   kakaoLogin
}
