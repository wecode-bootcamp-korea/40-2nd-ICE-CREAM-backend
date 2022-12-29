const dataSource = require('./data-source')

const getUserByKakaoId = async (kakaoId) => {
    try{
        const result = await dataSource.query(`
            SELECT 
                kakao_id
            FROM
                users
            WHERE
                kakao_id = ${kakaoId}
            `)

        return result.length
    } catch {
        throw new Error('getUserByKakaoIdErr')
    }
}

const insertKakaoId = async (kakaoId, email, profileImage, nickname) => {
    try {
        const result = await dataSource.query(`
            INSERT INTO users (
                kakao_id,
                email,
                profile_image,
                nickname
            ) VALUES (
                ?,
                ?,
                ?,
                ?
            )`,
            [kakaoId, email, profileImage, nickname]
        )
    } catch {
        throw new Error('insertKakaoIdErr')
    }
}

module.exports = {
    getUserByKakaoId,
    insertKakaoId
}