const userDao = require('../models/userDao')
const jwt = require('jsonwebtoken')
const axios = require('axios');

const kakaoLogin = async (authCode) => {
    try { 
        const getToken = await axios.get('https://kauth.kakao.com/oauth/token', {
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

        const getUserData = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${getToken.data.access_token}`
            }
        })

        const kakaoId = getUserData.data.id
        const email = getUserData.data.kakao_account.email
        const profileImage = getUserData.data.properties.profile_image
        const nickname = getUserData.data.properties.nickname

        const isExist = await userDao.getUserByKakaoId(kakaoId);
        let accessToken = '';

        if (isExist == 0) {
            await userDao.insertKakaoId(kakaoId, email, profileImage, nickname);
            accessToken = jwt.sign({id: kakaoId}, process.env.JWT_SECRET,
                {
                    algorithm: process.env.ALGORITHM,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            )
        } else {
            accessToken = jwt.sign({id: isExist.kakao_id}, process.env.JWT_SECRET,
                {
                    algorithm: process.env.ALGORITHM,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            )
        }

        return accessToken
    } catch {
        throw new Error('kakaoLoginServiceErr')
    }
}

module.exports = {
   kakaoLogin
}