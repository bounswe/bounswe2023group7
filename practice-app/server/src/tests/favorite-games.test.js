import request from "supertest";
import app from "../app";
import { User } from "../models/user.model.js";

let accessToken = "";
describe("Favorite Games routes", () => {
  beforeAll(async () => {
    try {
      await request(app).post("/api/users/signup").send({username: "test", email: "test@email.com", password: "testpassword"});
      const response  = await request(app).post("/api/users/login").send({identifier: "test",password: "testpassword"});
      accessToken = response.body.accessToken;
    } catch (error) {
    }
  });
  afterAll(async () => {
    try {
      await User.deleteOne({username: "test"});
    } catch (error) {  
    }
  });
  describe("Search route", () => {
    describe("Should return a list of games", () => {
      test("GET /api/favorite-games/search?searchValue=Call of duty",  () => 
        request(app)
          .get("/api/favorite-games/search?searchValue=Call of duty")
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveProperty("length");
            expect(res.body.length).toBeGreaterThan(0);
          })
      );
    });
    describe("Should return 404", () => {
      test("GET /api/favorite-games/search?searchValue=Call of duty21321321321", () => 
        request(app)
          .get("/api/favorite-games/search?searchValue=Call of duty21321321321")
          .expect(404)
          .then()
      );
    });
  });    
  describe("Add to favorites route", () => {
    describe("Should return 200 and created document", () => {
      test("POST /api/favorite-games?appId=730", () => 
        request(app)
        .post("/api/favorite-games?appId=730")
        .set('Authorization', accessToken)
        .expect(200)
        .then((res) => {
            expect(res.body).toHaveProperty("created");
            expect(res.body.created).toHaveProperty("appId");
            expect(res.body.created.appId).toBe(730);
        })
      );
    });
    describe("Should return 409 due to duplication", () => {
      test("POST /api/favorite-games?appId=730", () => 
        request(app)
        .post("/api/favorite-games?appId=730")
        .set('Authorization', accessToken)
        .expect(409)
        .then()
      );
    });
    describe("Should return 400", () => {
      test("POST /api/favorite-games", () => 
        request(app)
        .post("/api/favorite-games")
        .set('Authorization', accessToken)
        .expect(400)
        .then()
      );
    });
    describe("Should return 404", () => {
      test("POST /api/favorite-games?appId=73023132132131", () => 
        request(app)
        .post("/api/favorite-games?appId=73023132132131")
        .set('Authorization', accessToken)
        .expect(404)
        .then()
      );
    });
    describe("Should return 401 due to lack of access token", () => {
      test("POST /api/favorite-games?appId=730", () => 
        request(app)
        .post("/api/favorite-games?appId=730")
        .expect(401)
        .then()
      );
    });
  });
  describe("Get favorites route", () => {
    describe("Should return 200 and a list of favorite games", () => {
      test("GET /api/favorite-games", () => 
        request(app)
        .get("/api/favorite-games")
        .set('Authorization', accessToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("length");
          expect(res.body.length).toBe(1);
          expect(res.body[0].appId).toBe(730);
        })
      );
    });
    describe("Should return 401 due to lack of access token", () => {
      test("GET /api/favorite-games", () => 
        request(app)
        .get("/api/favorite-games")
        .expect(401)
        .then()
      );
    });
  });
  describe("Remove from favorites route", () => {
    describe("Should return 200", () => {
      test("DELETE /api/favorite-games?appId=730", () => 
      request(app)
      .delete("/api/favorite-games?appId=730")
      .set('Authorization', accessToken)
      .expect(200)
      .then()
      );
    });
    describe("Should return 404", () => {
      test("DELETE /api/favorite-games?appId=730", () => 
      request(app)
      .delete("/api/favorite-games?appId=730")
      .set('Authorization', accessToken)
      .expect(404)
      .then()
      );
    });
    describe("Should return 400 due to lack of appId", () => {
      test("DELETE /api/favorite-games", () => 
        request(app)
        .post("/api/favorite-games")
        .set('Authorization', accessToken)
        .expect(400)
        .then()
      );
    });
    describe("Should return 401 due to lack of access token", () => {
      test("DELETE /api/favorite-games?appId=730", () => 
      request(app)
      .delete("/api/favorite-games?appId=730")
      .expect(401)
      .then()
      );
    });
  });
});     