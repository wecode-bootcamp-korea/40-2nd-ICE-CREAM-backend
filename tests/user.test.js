const request = require("supertest");
const axios = require('axios');
const { createApp } = require("../app");
const appDataSource = require("../src/models/data-source");

describe("Kakao Login", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE users`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
        await appDataSource.destroy();
    });

    test("FAILED: No Auth Code", async () => {
        await request(app)
            .post("/users/login")
            .expect(400)
            .expect({ error: true, message: 'MISSING_AUTH_CODE' });
    });
        
    test('SUCCESS: Kakao Login', async () => {
        axios.get = jest.fn().mockReturnValue({
            data: 'bypass first axios.get'
        })

        axios.get = jest.fn().mockReturnValue({
            data: {
                id: 1010101010,
                properties: {
                  nickname: "닉네임",
                  profile_image: "이미지.jpg"
                },
                kakao_account: {
                  profile: {
                    nickname: "닉네임",
                  },
                  email: "email@test.com",
                },
              }
        })

        await request(app)
            .post("/users/login?code=testAuthCode")
            .expect(200);
    })
});