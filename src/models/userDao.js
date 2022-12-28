const dataSource = require('./data-source')

const getUserByKakaoId = async (id) => {
	const result = await dataSource.query(`
		SELECT 
			id,
            nickname,
            email
		FROM users
		WHERE social_id = ?
        `, [id]
	)
	return result[0]
}

const checkRegisteredAlready = async (kakaoId) => {
    try{
        const [res] = await dataSource.query(`
            SELECT EXISTS(
                SELECT id FROM users
                WHERE social_id = ?
            ) AS registered
            `, [kakaoId]
        )

        return !!parseInt(res.registered)
    } catch {
        throw new Error('checkRegisteredAlreadyErr')
    }
}

const createUser = async (kakaoId, email, profileImage, nickname) => {
    try {
        await dataSource.query(`
            INSERT INTO users(
                social_id,
                email,
                profile_image_url,
                nickname
            ) VALUES (
                ?,
                ?,
                ?,
                ?
            )`, [kakaoId, email, profileImage, nickname]
        )
    } catch {
        throw new Error('createUserErr')
    }
}

module.exports = {
    getUserByKakaoId,
    checkRegisteredAlready,
    createUser
}