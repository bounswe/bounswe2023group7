import request from "supertest";
import app from "../app";
import { User } from "../models/user.model.js";
beforeAll(async () => {
  try {
    await User.deleteOne({username: "example"});
  } catch (error) {

  }
});
describe("User routes", () => {
  describe("Signup route", () => {
    describe("Should return 200", () => {
      test("POST /api/users/signup", () => 
      request(app)
      .post("/api/users/signup")
      .send({username: "example", email: "email@example.com", password: "testpassword"})
      .expect(200)
      );
    });
    describe("Should return 409", () => {
      test("POST /api/users/signup", () => 
      request(app)
      .post("/api/users/signup")
      .send({username: "example", email: "email@example.com", password: "testpassword"})
      .expect(409)
      );
    });
    describe("Should return 400", () => {
      test("POST /api/users/signup", () => 
      request(app)
      .post("/api/users/signup")
      .send({email: "email@example.com", password: "testpassword"})
      .expect(400)
      );
    });
  });
  describe("Login route", () => {
    describe("Should return 200", () => {
      test("POST /api/users/login", () => 
      request(app)
      .post("/api/users/login")
      .send({identifier: "example", password: "testpassword"})
      .expect(200)
      );
    });
    describe("Should return 400", () => {
      test("POST /api/users/login", () => 
      request(app)
      .post("/api/users/login")
      .send({ password: "testpassword"})
      .expect(400)
      );
    });
    describe("Should return 403", () => {
      test("POST /api/users/login", () => 
      request(app)
      .post("/api/users/login")
      .send({identifier: "email@example.com", password: "testpassword2"})
      .expect(403)
      );
    });
  });
});    