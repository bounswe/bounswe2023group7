import request from "supertest";
import app from "../app.js";

describe("Random Game Test", () => {
    test("GET /api/random-game", (done) => {
        request(app)
        .get("/api/random-game")
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
});