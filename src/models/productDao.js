const dataSource = require(‘./data-source’)
const whereSet = {
    DEFAULT : ‘’,
    TRUE : ‘WHERE’
}
const andSet = {
    DEFAULT : ‘’,
    TRUE : ‘AND’
}
const joinSet = {
    DEFAULT : ‘’,
    OPTIONS : ‘LEFT JOIN options AS op ON op.product_id = p.id’,
    BIDS : ‘LEFT JOIN bids AS b ON op.id = b.option_id’
}
const getAllProducts = async (categoryId, size, orderBy) => {
    try {
        const categorySet = {
            DEFAULT : ‘’,
            [categoryId] : `p.category_id = ${categoryId}`,
        }
        const sizeSet = {
            DEFAULT : ‘’,
            [size] : `op.size = ‘${size}’`,
        }
        if(!categoryId && !size)
            {joinOption = ‘DEFAULT’; where = ‘DEFAULT’; categoryId = ‘DEFAULT’; and = ‘DEFAULT’; size = ‘DEFAULT’; and2 = ‘DEFAULT’;}
        else if(categoryId && !size)
            {joinOption = ‘DEFAULT’; where = ‘TRUE’; categoryId; and = ‘DEFAULT’; size = ‘DEFAULT’; and2 = ‘DEFAULT’;}
        else if(size && !categoryId)
            {joinOption = ‘OPTIONS’; where = ‘TRUE’; categoryId = ‘DEFAULT’; and = ‘DEFAULT’; size; and2 = ‘TRUE’;}
        else if(categoryId && size)
            {joinOption = ‘OPTIONS’; where = ‘TRUE’; categoryId; and = ‘TRUE’; size; and2 = ‘TRUE’;}
        const getProductId = await dataSource.query(`
            SELECT p.id FROM products AS p
            ${joinSet[joinOption]}
            ${whereSet[where]}
            ${categorySet[categoryId]}
            ${andSet[and]}
            ${sizeSet[size]}
        `)
        let returnData = [];
        for (let i=0; i<getProductId.length; i++) {
            const [getPrices] = await dataSource.query(`
                SELECT b.price FROM bids AS b
                LEFT JOIN options AS op ON b.option_id = op.id
                LEFT JOIN products AS p ON op.product_id = p.id
                LEFT JOIN orders AS o ON b.id = o.bid_id
                WHERE p.id = ?
                AND b.type_id = 2
                AND b.id NOT IN (SELECT bid_id FROM orders)
                ${andSet[and2]}
                ${sizeSet[size]}
                ORDER BY b.price ASC;
            `, [getProductId[i].id]
            )
            if (!getPrices) {
                returnData.push({id : getProductId[i].id, price : ‘’})
            } else {
                returnData.push({id : getProductId[i].id, price : getPrices.price})
            }
        }
        for (let i=0; i<getProductId.length; i++) {
            const getOtherProductsData = await dataSource.query(`
                SELECT
                    p.thumbnail_image_url AS thumbnailImageUrl,
                    b.name AS brandName,
                    p.en_name AS enName,
                    p.kr_name AS krName,
                    p.release_date AS releaseDate
                FROM products AS p
                LEFT JOIN brands AS b ON b.id = p.brand_id
                WHERE p.id = ?
            `, [getProductId[i].id]
            )
            returnData[i].thumbnailImageUrl = getOtherProductsData[0].thumbnailImageUrl
            returnData[i].brandName = getOtherProductsData[0].brandName
            returnData[i].enName = getOtherProductsData[0].enName
            returnData[i].krName = getOtherProductsData[0].krName
            returnData[i].releaseDate = getOtherProductsData[0].releaseDate
        }
        if (!orderBy) {
            returnData = returnData
        } else if (orderBy == ‘priceHighToLow’) {
            let arr = [];
            for (let i=0; i<returnData.length; i++) {
                if (returnData[i].price !== ‘’) {
                    arr.push(returnData[i])
                }
            }
            arr.sort((a, b) => b.price - a.price)
            returnData = arr;
        } else if (orderBy == ‘releaseDate’) {
            returnData = returnData.sort((a, b) => b.releaseDate - a.releaseDate)
        }
        return returnData
    } catch (err){
        console.log(err)
        throw new Error(‘getAllProductsErr’)
    }
}
const getConstantProductDataById = async (productId) => {
    let [x] =  await dataSource.query(`
        SELECT
            b.price
        FROM
            bids AS b
        LEFT JOIN options AS op ON b.option_id = op.id
        LEFT JOIN products AS p ON op.product_id = p.id
        LEFT JOIN orders AS o ON o.bid_id = b.id
        WHERE
            p.id = ${productId}
        AND
            b.id NOT IN (SELECT bid_id FROM orders)
        AND
            b.type_id = 2
        ORDER BY b.price ASC
    `)
    if (!x) x = {price : ‘’}
    let [y] =  await dataSource.query(`
        SELECT
            b.price
        FROM
            bids AS b
        LEFT JOIN options AS op ON b.option_id = op.id
        LEFT JOIN products AS p ON op.product_id = p.id
        LEFT JOIN orders AS o ON o.bid_id = b.id
        WHERE
            p.id = ${productId}
        AND
            b.id NOT IN (SELECT bid_id FROM orders)
        AND
            b.type_id = 1
        ORDER BY b.price DESC
    `)
    if (!y) y = {price : ‘’}
    let [z] = await dataSource.query(`
        SELECT
            JSON_ARRAYAGG(i.image_url) AS imageUrl
        FROM
            product_images AS i
        LEFT JOIN
            products AS p ON i.product_id = p.id
        WHERE
            p.id = ?
        `, [productId]
    )
    let imgArr = [];
    for (let i=0; i<z.imageUrl.length; i++) {
        imgArr.push({
            alt : ‘alt’,
            url : z.imageUrl[i]
        })
    }
    const main = await dataSource.query(`
        SELECT
            p.id,
            b.name AS brandName,
            p.en_name AS enName,
            p.kr_name AS krName,
            p.thumbnail_image_url AS thumbnailImageUrl,
            p.recent_trade_price AS recentTradePrice,
            p.model_number AS modelNumber,
            p.category_id AS categoryId,
            DATE_FORMAT(p.release_date, ‘%y/%m/%d’) AS releaseDate,
            p.color,
            p.original_price AS originalPrice
        FROM
            products AS p
        LEFT JOIN
            brands AS b ON p.brand_id = b.id
        WHERE
            p.id = ?
        `, [productId]
    )
    main[0].buyNow = x.price
    main[0].sellNow = y.price
    main[0].images = imgArr
    return main
}
const getProductTradeDataById = async (productId) => {
    await dataSource.query(`
        SET @rownum:=0
    `)
    const tradeDataAll = await dataSource.query(`
        SELECT
            (@rownum:=@rownum + 1) AS id,
            op.size,
            DATE_FORMAT(o.created_at, ‘%Y/%m/%d’) AS date,
            o.amount AS price
        FROM orders AS o
        LEFT JOIN bids AS b ON o.bid_id = b.id
        LEFT JOIN options AS op ON b.option_id = op.id
        LEFT JOIN products AS p ON op.product_id = p.id
        WHERE p.id = ?
        AND o.status_id = 1
        ORDER BY date DESC
        `, [productId]
    )
    const buyBidDataAll = await dataSource.query(`
        SELECT
            (@rownum:=@rownum + 1) AS id,
            op.size,
            DATE_FORMAT(b.created_at, ‘%Y/%m/%d’) AS date,
            b.price AS price
        FROM bids AS b
        LEFT JOIN options AS op ON op.id = b.option_id
        LEFT JOIN products AS p ON op.product_id = p.id
        WHERE p.id = ?
        AND b.type_id = 1
        ORDER BY b.price DESC
        `, [productId]
    )
    const sellBidDataAll = await dataSource.query(`
        SELECT
            (@rownum:=@rownum + 1) AS id,
            op.size,
            DATE_FORMAT(b.created_at, ‘%Y/%m/%d’) AS date,
            b.price AS price
        FROM bids AS b
        LEFT JOIN options AS op ON op.id = b.option_id
        LEFT JOIN products AS p ON op.product_id = p.id
        WHERE p.id = ?
        AND b.type_id = 2
        ORDER BY price ASC
        `, [productId]
    )
        const tradeDataLimit = tradeDataAll.slice(0,5)
        const buyBidDataLimit = buyBidDataAll.slice(0,5)
        const sellBidDataLimit = sellBidDataAll.slice(0,5)
        const all = [{
            tradeDataAll,
            buyBidDataAll,
            sellBidDataAll}]
        const limit = [{
            tradeDataLimit,
            buyBidDataLimit,
            sellBidDataLimit}]
    return [all, limit]
}
const getProductChartDataById = async (productId) => {
    const getBidIdAndAvgPrice = await dataSource.query(`
        SELECT
            AVG(o.amount) AS amount,
            DATE_FORMAT(o.created_at, ‘%Y/%m/%d’) AS date
        FROM orders AS o
        LEFT JOIN bids AS b ON o.bid_id = b.id
        LEFT JOIN options AS op ON b.option_id = op.id
        LEFT JOIN products AS p ON op.product_id = p.id
        WHERE p.id = ${productId}
        GROUP BY date
        ORDER BY date DESC
    `)
    let chartData = []
    for (let i=0; i<getBidIdAndAvgPrice.length; i++) {
        chartData.push(
            {
                y : getBidIdAndAvgPrice[i].amount,
                x : getBidIdAndAvgPrice[i].date
            }
        )
    }
    return [{
            id : productId,
            data : chartData
        }]
}
module.exports = {
    getConstantProductDataById,
    getProductTradeDataById,
    getProductChartDataById,
    getAllProducts
}