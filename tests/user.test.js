const request = require("supertest");
const { createApp } = require("../app");
const AppDataSource = require("../src/models/data-source");

describe("Kakao Login", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
    });

    test("FAILED: No Auth Code", async () => {
        await request(app)
            .post("/users/login")
            .expect(400)
            .expect({ error: true, message: 'MISSING_AUTH_CODE' });
    });

    test("FAILED: Login Fail", async () => {
        await request(app)
            .post("/users/login?code=wrongAuthCode")
            .expect(400)
            .expect({ error: true, message: 'LOGIN_FAILED_KAKAO' });
    });
    
});