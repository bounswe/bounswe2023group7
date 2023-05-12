import request from "supertest";
import app from "../app";
import { User } from "../models/user.model.js";
import { Platform } from "../models/game-platform.model.js";


beforeEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

let accessToken = "";
describe("Game Platform routes", () => {
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
        await Platform.deleteMany({username: "test"});    
        await User.deleteone({username: "test"});
        
        } catch (error) {  
        }
    });
    describe("Search route", () => {
        describe("Should return a list of games", () => {
            test("GET /api/game-platform/search?title=god of war",  () => 
                request(app)
                .get("/api/game-platform/search?title=god of war")
                .set('Authorization', accessToken)
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveProperty("games");
                }));
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
          describe("Empty input which means bad request", () => {
            test("GET /api/game-platform/search?title=",  () => 
                request(app)
                .get("/api/game-platform/search?title=")
                .set('Authorization', accessToken)
                .expect(400)
                );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
        describe("Should return a list of games", () => {
            test("GET /api/game-platform/search?title=gOD OF WAr Ii",  () => 
                request(app)
                .get("/api/game-platform/search?title=gOD OF WAr Ii")
                .set('Authorization', accessToken)
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveProperty("games");
                }));
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
        describe("Should return 404", () => {
            test("GET /api/game-platform/search?title=pokemon dark blue", () => 
            request(app)
                .get("/api/game-platform/search?title=pokemon dark blue")
                .set('Authorization', accessToken)
                .expect(404)
                .then()
            );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
        describe("Should return 422", () => {
            test("GET /api/game-platform/search?title=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", () => 
            request(app)
                .get("/api/game-platform/search?title=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .set('Authorization', accessToken)
                .expect(422)
                .then()
            );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
          describe("Should not access to server.", () => {
            test("GET /api/game-platform/search?title=god of war",  () => 
                request(app)
                .get("/api/game-platform/search?title=god of war")
                .expect(401));
        });
    });
    beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
      });
    describe("Get Platform", () => {
        describe("Should return a platforms of a game", () => {
            test("GET /api/game-platform/game?id=01",  () => 
                request(app)
                .get("/api/game-platform/game?id=01")
                .set('Authorization', accessToken)
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveProperty("platforms");
                }));
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
          describe("Should not find any result", () => {
            test("GET /api/game-platform/game?id=",  () => 
                request(app)
                .get("/api/game-platform/game?id=")
                .set('Authorization', accessToken)
                .expect(404)
                );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
          describe("Should not access to server", () => {
            test("GET /api/game-platform/game?id=01",  () => 
                request(app)
                .get("/api/game-platform/game?id=01")
                .expect(401));
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          });
          describe("Should not find any result", () => {
            test("GET /api/game-platform/game?id=100000000",  () => 
                request(app)
                .get("/api/game-platform/game?id=100000000")
                .set('Authorization', accessToken)
                .expect(404)
                );
        });
    });
    describe("Post Your Platform", () => {
        describe("Should return a success message", () => {
            test("POST /api/game-platform/platform?title=xbox",  () => 
                request(app)
                .post("/api/game-platform/platform?title=xbox")
                .set('Authorization', accessToken)
                .expect(200)
                );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
        });
        describe("Should return a success message, user should be able to submit another platform", () => {
            test("POST /api/game-platform/platform?title=windows",  () => 
                request(app)
                .post("/api/game-platform/platform?title=windows")
                .set('Authorization', accessToken)
                .expect(200)
                );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
        });
        describe("Should not submit anything due to there is nothing like xbox two", () => {
            test("POST /api/game-platform/platform?title=xbox two",  () => 
                request(app)
                .post("/api/game-platform/platform?title=xbox two")
                .set('Authorization', accessToken)
                .expect(404)
                );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
        });
        describe("Should not submit anything due to bad request", () => {
            test("POST /api/game-platform/platform?title=",  () => 
                request(app)
                .post("/api/game-platform/platform?title=")
                .set('Authorization', accessToken)
                .expect(400)
                );
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
        });
        describe("Should not access to server", () => {
            test("POST /api/game-platform/platform?title=xbox",  () => 
                request(app)
                .post("/api/game-platform/platform?title=xbox")
                .expect(401));
        });
        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
        });;
        describe("Should not submit anything due to dupliation", () => {
            test("POST /api/game-platform/platform?title=xbox",  () => 
                request(app)
                .post("/api/game-platform/platform?title=xbox")
                .set('Authorization', accessToken)
                .expect(409)
                );
        });
    });   
});