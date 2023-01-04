const request = require("supertest");
const { createApp } = require("../app");
const appDataSource = require("../src/models/data-source");

describe("GET Products", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.destroy();
    });

    test("FAILED: getProductById", async () => {
        await request(app)
            .get("/products/-")
            .expect(400)
            .expect({ error: true, message: 'CANNOT_GET_PRODUCT' });
    });

    test("SUCCESS: getProductById", async () => {
        await request(app)
            .get("/products/1")
            .expect(200);
    });

})

