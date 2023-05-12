import request from "supertest";
import app from "../app";

describe("Tests for GET /api/genre", () => {
  test("GET /api/genre", () => 
    request(app)
      .get("/api/genre")
      .expect(200)
      .then()
  );  
});

describe("Tests for GET /api/genreDb", () => {
  test("GET /api/genreDb should return an empty array", () => 
    request(app)
      .get("/api/genreDb")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([]);
      })
  );

  test("GET /api/genreDb Not Modified response", () => 
    request(app)
      .get("/api/genreDb")
      .expect(304)
      .then()
  );
});

    test("GET /api/genreDb is return expected outputs", () => 
      request(app)
        .post("/api/genre")
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("success", true);
        })
    );

describe("Tests for POST /api/genre", () => {
  test("POST /api/genre is add database", () => 
    request(app)
      .post("/api/genre")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
      })
  );

  test("POST /api/genre expects email", () => 
    request(app)
      .post("/api/genre")
      .expect()
      .then()
  );
});
