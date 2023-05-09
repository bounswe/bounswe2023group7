import request from "supertest";
import app from "../app";

describe("Example test", () => {
    test("GET /api", (done) => {
        request(app)
        .get("/api")
        .expect(401)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });     
});                     