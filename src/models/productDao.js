const dataSource = require('./data-source')

const getConstantProductDataById = async (productId) => {
    return await dataSource.query(`
        SELECT
            p.id,
            b.name AS brandName,
            p.en_name AS enName,
            p.kr_name AS krName,
            p.thumbnail_image_url AS thumbnailImageUrl,
            p.recent_trade_price AS recentTradePrice,
            p.model_number AS modelNumber,
            p.category_id AS categoryId,
            DATE_FORMAT(p.release_date, '%y/%m/%d') AS releaseDate,
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
}

const getProductTradeDataById = async (productId) => {
    await dataSource.query(`
        SET @rownum:=0
    `)

    const tradeDataAll = await dataSource.query(`
        SELECT
            (@rownum:=@rownum + 1) AS id,
            op.size,
            DATE_FORMAT(o.created_at, '%Y/%m/%d') AS date,
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
            DATE_FORMAT(b.created_at, '%Y/%m/%d') AS date,
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
            DATE_FORMAT(b.created_at, '%Y/%m/%d') AS date,
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
            DATE_FORMAT(o.created_at, '%Y/%m/%d') AS date
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
    getProductChartDataById
}