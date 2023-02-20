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
    
    //* UTILS
        accessTokenErr : {
            statusCode : 400,
            message : "ACCESS_TOKEN_REQUIRED"
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
        },

        
    //* ORDERS
        addBuyOrderErr : {
            statusCode : 400,
            message : "FAILED_PURCHASE"
        },

        addBuyBidErr : {
            statusCode : 400,
            message : "FAILED_BID"
        },

        addSellOrderErr : {
            statusCode : 400,
            message : "FAILED_SELL"
        },

        addSellBidErr : {
            statusCode : 400,
            message : "FAILED_BID"
        },

        sameUserErr : {
            statusCode : 400,
            message : "SAME_USER"
        },
}