module.exports = {
    //* GLOBAL
        keyErr : {
            statusCode : 400,
            message : "KEY_ERROR"
        },
        
    //* PRODUCTS 
    
    
    //* USERS
        authCodeErr : {
            statusCode : 400,
            message : "MISSING_AUTH_CODE"
        },

        kakaoLoginServiceErr : {
            statusCode : 400,
            message : "LOGIN_FAILED_KAKAO"
        },

        getUserByKakaoIdErr : {
            statusCode : 400,
            message : "CANNOT_FIND_USER_KAKAO_ID"
        },

        insertKakaoIdErr : {
            statusCode : 400,
            message : "FAILED_TO_ADD_USER_KAKAO"
        }


    //* ORDERS

}