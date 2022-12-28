const dataSource = require('./data-source')
const queryRunner = dataSource.createQueryRunner()

const addBuyOrder = async (productId, size, price, userId) => {
    try {
        await queryRunner.connect()
        await queryRunner.startTransaction()

        const getBidData = await queryRunner.query(`
            SELECT 
                b.id,
                b.user_id
            FROM 
                bids AS b
            LEFT JOIN options AS op ON b.option_id = op.id
            LEFT JOIN products AS p ON p.id = op.product_id
            WHERE 
                b.price = ?
                AND b.type_id = 2
                AND op.size = ?
                AND p.id = ?
                AND b.id NOT IN (SELECT bid_id FROM orders)
            ORDER BY
                b.created_at ASC
        `, [price, size, productId]
        )

        if (getBidData[0].user_id == userId) {
            throw new Error('sameUserErr')
        }
        
        await queryRunner.query(`
            INSERT INTO
                orders (
                    buyer_id,
                    seller_id,
                    bid_id,
                    amount
                ) VALUES (
                    ?,
                    ?,
                    ?,
                    ?
                )
        `, [userId, getBidData[0].user_id, getBidData[0].id, price]
        )
            
        await queryRunner.commitTransaction()
    } catch (err) {
        await queryRunner.rollbackTransaction()
        if (err.message == 'sameUserErr') throw err
        throw new Error('addBuyOrderErr')
    }
}

const addBuyBid = async (productId, size, price, userId) => {

    try {
        const getOptionId = await dataSource.query(`
            SELECT
                op.id
            FROM options AS op
            LEFT JOIN products AS p ON op.product_id = p.id
            WHERE p.id = ?
            AND op.size = ?
        `, [productId, size]
        )

        await dataSource.query(`
            INSERT INTO
                bids (
                    user_id,
                    type_id,
                    option_id,
                    price
                ) VALUES (
                    ?,
                    1,
                    ?,
                    ?
                )
        `, [userId, getOptionId[0].id, price]
        )
    } catch {
        throw new Error('addBuyBidErr')
    }
}

const addSellOrder = async (productId, size, price, userId) => {
    try {
        await queryRunner.connect()
        await queryRunner.startTransaction()

        const getBidData = await queryRunner.query(`
            SELECT 
                b.id,
                b.user_id
            FROM 
                bids AS b
            LEFT JOIN options AS op ON b.option_id = op.id
            LEFT JOIN products AS p ON p.id = op.product_id
            WHERE 
                b.price = ?
                AND b.type_id = 1
                AND op.size = ?
                AND p.id = ?
                AND b.id NOT IN (SELECT bid_id FROM orders)
            ORDER BY
                b.created_at ASC
        `, [price, size, productId]
        )

        if (getBidData[0].user_id == userId) {
            throw new Error('sameUserErr')
        }
        
        await queryRunner.query(`
            INSERT INTO
                orders (
                    buyer_id,
                    seller_id,
                    bid_id,
                    amount
                ) VALUES (
                    ?,
                    ?,
                    ?,
                    ?
                )
        `, [getBidData[0].user_id, userId, getBidData[0].id, price]
        )
            
        await queryRunner.commitTransaction()
    } catch (err) {
        await queryRunner.rollbackTransaction()
        if (err.message == 'sameUserErr') throw err
        throw new Error('addSellOrderErr')
    }
}

const addSellBid = async (productId, size, price, userId) => {
    try {
        const getOptionId = await dataSource.query(`
            SELECT
                op.id
            FROM options AS op
            LEFT JOIN products AS p ON op.product_id = p.id
            WHERE p.id = ?
            AND op.size = ?
        `, [productId, size]
        )

        await dataSource.query(`
            INSERT INTO
                bids (
                    user_id,
                    type_id,
                    option_id,
                    price
                ) VALUES (
                    ?,
                    2,
                    ?,
                    ?
                )
        `, [userId, getOptionId[0].id, price]
        )
    } catch {
        throw new Error('addSellBidErr')
    }
}

module.exports = {
    addBuyOrder,
    addBuyBid,
    addSellOrder,
    addSellBid
}