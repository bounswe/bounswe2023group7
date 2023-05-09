import request from "supertest";
import app from "../app";

describe("Favorite Games routes", () => {
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
      test("POST /api/favorite-games?email=test@email.com&appId=730", () => 
        request(app)
        .post("/api/favorite-games?email=test@email.com&appId=730")
        .expect(200)
        .then((res) => {
            expect(res.body).toHaveProperty("created");
            expect(res.body.created).toHaveProperty("appId");
            expect(res.body.created.appId).toBe(730);
        })
      );
    });
    describe("Should return 409 due to duplication", () => {
      test("POST /api/favorite-games?email=test@email.com&appId=730", () => 
        request(app)
        .post("/api/favorite-games?email=test@email.com&appId=730")
        .expect(409)
        .then()
      );
    });
    describe("Should return 400", () => {
      test("POST /api/favorite-games?email=test@email.com", () => 
        request(app)
        .post("/api/favorite-games?email=test@email.com")
        .expect(400)
        .then()
      );
    });
    describe("Should return 404", () => {
      test("POST /api/favorite-games?email=test@email.com&appId=73023132132131", () => 
        request(app)
        .post("/api/favorite-games?email=test@email.com&appId=73023132132131")
        .expect(404)
        .then()
      );
    });
  });
  describe("Get favorites by email route", () => {
    describe("Should return 200 and a list of favorite games", () => {
      test("GET /api/favorite-games?email=test@email.com", () => 
        request(app)
        .get("/api/favorite-games?email=test@email.com")
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("length");
          expect(res.body.length).toBe(1);
          expect(res.body[0].appId).toBe(730);
        })
      );
    });
    describe("Should return 400", () => {
      test("GET /api/favorite-games", () => 
        request(app)
        .get("/api/favorite-games")
        .expect(400)
        .then()
      );
    });
  });
  describe("Remove from favorites route", () => {
    describe("Should return 200", () => {
      test("DELETE /api/favorite-games?email=test@email.com&appId=730", () => 
      request(app)
      .delete("/api/favorite-games?email=test@email.com&appId=730")
      .expect(200)
      .then()
      );
    });
    describe("Should return 404", () => {
      test("DELETE /api/favorite-games?email=test@email.com&appId=730", () => 
      request(app)
      .delete("/api/favorite-games?email=test@email.com&appId=730")
      .expect(404)
      .then()
      );
    });
    describe("Should return 400", () => {
      test("DELETE /api/favorite-games?email=test@email.com", () => 
        request(app)
        .post("/api/favorite-games?email=test@email.com")
        .expect(400)
        .then()
      );
    });
  });
});     