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

    //in this block, im testing 
    describe('find location route', () => {

        //under what condition I'm testing , (no ip address is provided | location does not exist)
        describe('given the location does not exist', () => {

            //my expectation
            test('it shoud return a 500 code', async () => {
                
               await supertest(app).get('/api/location/findLocation?ip_address=0.0.0.0.12').
                expect(500)
                .then()
            })

        })
   
        describe('if ip_address is not provided', () => {

            //my expectation
            test('it shoud return a 400 code', async () => {
                
                await supertest(app).get('/api/location/findLocation')
                .expect(400)
                .then()
            })

        })

    })


    describe ('add location route', () => {

        describe ("if no email is provided", () => {
            //my expectation
            test('it shoud return a 400 code', async () => {
            
                await supertest(app)
                .post("/api/location/addLocation?ip_address=193.140.194.36")
                .set('Authorization', accessToken)
                .expect(400)
                .then()
            });
        });

        describe ("if no ip_address  is provided", () => {
            //my expectation
            test('it shoud return a 400 code', async () => {
                await supertest(app)
                .post("/api/location/addLocation?email=e@kizilkaya.com")
                .set('Authorization', accessToken)
                .expect(400)
                .then()
            });
        })
    })


    describe ('history route', () => {

        describe ("if no email is provided", () => {
            //my expectation
            test('it shoud return a 400 code',async() => {
            
                 await supertest(app)
                .get('/api/location/history')
                .set('Authorization', accessToken)
                .expect(400)
                .then()
            })
        })
    })


})