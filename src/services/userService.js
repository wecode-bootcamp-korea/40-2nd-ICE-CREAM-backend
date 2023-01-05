const userDao = require('../models/userDao')
const jwt = require('jsonwebtoken')
const axios = require('axios');

const kakaoLogin = async (authCode) => {
    const getKakaoToken = await axios.get('https://kauth.kakao.com/oauth/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            grant_type: 'authorization_code',
            client_id: process.env.REST_API_KEY,
            redirect_url: process.env.REDIRECT_URI,
            code: authCode
        },
        withCredentials: true
    })

    const getKakaoUserData = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            'Authorization': `Bearer ${getKakaoToken.data.access_token}`
        }
    })

    const kakaoId = getKakaoUserData.data.id
    const email = getKakaoUserData.data.kakao_account.email
    const {profile_image: profileImage, nickname} = getKakaoUserData.data.properties

    const isExist = await userDao.checkRegisteredAlready(kakaoId);
    
    let accessToken = '';

    if (!isExist) {
        await userDao.createUser(kakaoId, email, profileImage, nickname);
        accessToken = jwt.sign({id: kakaoId}, process.env.JWT_SECRET,
            {
                algorithm: process.env.ALGORITHM,
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
    } else {
        accessToken = jwt.sign({id: isExist.social_id}, process.env.JWT_SECRET,
            {
                algorithm: process.env.ALGORITHM,
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
    }

    return accessToken
}

module.exports = {
   kakaoLogin
}