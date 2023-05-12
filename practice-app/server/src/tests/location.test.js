import supertest from "supertest";
import app from "../app.js"
import { User } from "../models/user.model.js";
import { Axios } from "axios";

let accessToken = "";

describe('location', () =>{

    beforeAll(async () => {
        try {
          await supertest(app).post("/api/users/signup").send({username: "test", email: "test@email.com", password: "testpassword"});
          const response  = await supertest(app).post("/api/users/login").send({identifier: "test",password: "testpassword"});
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

    
    describe('find location route', () => {
        describe('/api/location/findLocation?ip_address=0.0.0.0.12 with no location found', () => {
            test('Should return a 500 code', async () => {
               await supertest(app).get('/api/location/findLocation?ip_address=0.0.0.0.12').
                expect(500)
                .then()
            })
        })
   
        describe('GET /api/location/findLocation with no ip_address', () => {
            test('Shoud return a 400 code', async () => {
                
                await supertest(app).get('/api/location/findLocation')
                .expect(400)
                .then()
            })
        })
    })

    describe ('add location route', () => {

        describe ("POST /api/location/addLocation with no login", () => {
            test('should return 401 code', async () => {
                await supertest(app)
                .post("/api/location/addLocation?ip_address=193.140.194.36")
                .expect(401)
                .then()
            });
        });

        describe ("POST /api/location/addLocation with no ip_address", () => {
            test('Shoud return a 400 code', async () => {
                await supertest(app)
                .post("/api/location/addLocation")
                .set('Authorization', accessToken)
                .expect(400)
                .then()
            });
        })
    })


    describe ('history route', () => {
        describe ("GET /api/location/history", () => {
            test('Should return 200 code',async() => {
            
                 await supertest(app)
                .get('/api/location/history')
                .expect(200)
                .set('Authorization', accessToken)
                .then()
            })
        })
    })
})