import request from "supertest";
import app from "../app.js";

let accessToken = '';
describe("Random Game Test", () => {
    beforeAll(async () => {
        try {
            await request(app).post("/api/users/signup").send({ username: "test", email: "test@email.com", password: "testpassword" });
            const response = await request(app).post("/api/users/login").send({ identifier: "test", password: "testpassword" });
            accessToken = response.body.accessToken;
        } catch (error) {
        }
    });
    afterAll(async () => {
        try {
            await User.deleteOne({ username: "test" });
        } catch (error) {
        }
    });

    describe("Should return 200", () => {
        test("GET /api/random-game/history", () => 
            request(app)
                .get("/api/random-game/history")
                .set('Authorization', accessToken)
                .expect(200)
                .then()
        );
    });
    describe("Should return 401", () => {
        test("GET /api/random-game/history", () => 
            request(app)
            .get("/api/random-game/history")
            .expect(401)
            .then()
        );
    });
    describe("Should return 200", () => {
        test("POST /api/random-game", () => 
            request(app)
            .post("/api/random-game")
            .set('Authorization', accessToken)
            .expect(200)
            .then()
        , 30000);
    });describe("Should return 401", () => {
        test("POST /api/random-game", () => 
            request(app)
            .post("/api/random-game/")
            .expect(401)
            .then()
        );
    });

});