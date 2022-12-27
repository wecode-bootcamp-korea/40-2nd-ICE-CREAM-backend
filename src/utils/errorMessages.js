module.exports = {
    //* GLOBAL
        keyErr : {
            statusCode : 400,
            message : "KEY_ERROR"
        },
        
    //* PRODUCTS 
        getProductByIdErr : {
            statusCode : 400,
            message : "CANNOT_GET_PRODUCT"
        },
    
    //* USERS
        missingAuthCode : {
            statusCode : 400,
            message : "MISSING_AUTH_CODE"
        },

        kakaoLoginServiceErr : {
            statusCode : 400,
            message : "LOGIN_FAILED_KAKAO"
        },

        checkRegisteredAlreadyErr : {
            statusCode : 400,
            message : "CANNOT_FIND_USER_KAKAO_ID"
        },

        createUserErr : {
            statusCode : 400,
            message : "FAILED_TO_ADD_USER_KAKAO"
        }

        
    //* ORDERS

}