const userService = require('../services/userService');
const { catchAsync } = require('../utils/error')

const kakaoLogin = catchAsync(async (req, res) => {
    const authCode = req.query.code;

    if (!authCode) throw new Error('missingAuthCode');

    const accessToken = await userService.kakaoLogin(authCode);
    res.status(200).json({accessToken})
})

module.exports = {
   kakaoLogin
}
