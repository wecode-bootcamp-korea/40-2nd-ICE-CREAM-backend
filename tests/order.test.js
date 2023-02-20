const request = require("supertest");
const jwt = require('jsonwebtoken');
const userDao = require('../src/models/userDao')
const { createApp } = require("../app");
const appDataSource = require("../src/models/data-source");

describe("Orders and Bids", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE bids`);
        await appDataSource.query(`TRUNCATE orders`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
        await appDataSource.destroy();
    });
    
    test("FAILED: Missing Access Token", async () => {
        await request(app)
            .post("/orders/buy")
            .send({
                productId: 1,
                size: 230,
                price: 50000.00
            })
            .expect(400)
            .expect({ error: true, message: 'ACCESS_TOKEN_REQUIRED' });
    });

    test("FAILED: Missing Key productId", async () => {
        const TOKEN = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
            algorithm: process.env.ALGORITHM,
            expiresIn: '1m' 
        })

        const userSpy = jest.spyOn(userDao, 'getUserByKakaoId');
        userSpy.mockReturnValue('true');

        await request(app)
            .post("/orders/buy")
            .set({ authorization: TOKEN })
            .send({
                size: '230',
                price: '50000.00'
            })
            .expect(400)
            .expect({ error: true, message: 'KEY_ERROR' });
    });

    test("FAILED: Missing Key price", async () => {
        const TOKEN = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
            algorithm: process.env.ALGORITHM,
            expiresIn: '1m' 
        })

        const userSpy = jest.spyOn(userDao, 'getUserByKakaoId');
        userSpy.mockReturnValue('true');

        await request(app)
            .post("/orders/buy")
            .set({ authorization: TOKEN })
            .send({
                productId : 1,
                size: '230'
            })
            .expect(400)
            .expect({ error: true, message: 'KEY_ERROR' });
    });

    test("FAILED: Buy", async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');

        const userSpy = jest.spyOn(userDao, 'getUserByKakaoId');
        userSpy.mockReturnValue('true');

        await request(app)
            .post("/orders/buy")
            .set({ authorization : 'randomjwt'})
            .send({ "productId" : 10, "size" : "240", "price" : "444444" })
            .expect(400)
            .expect({ error: true, message: 'FAILED_PURCHASE' });
    });

});