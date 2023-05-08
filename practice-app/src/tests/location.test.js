import supertest from "supertest";
import app from "../app.js"
import axios from "axios";

describe('location', () =>{

    //in this block, im testing 
    describe('find location route', () => {

        //under what condition I'm testing , (no ip address is provided | location does not exist)
        describe('given the location does not exist', () => {

            //my expectation
            it('it shoud return a <error_code>', async () => {
                
                await supertest(app).get('/api/location/findLocation?ip_address=0.0.0.0.12').
                expect(500)
            })

        })
   
        describe('if ip_address is not provided', () => {

            //my expectation
            it('it shoud return a 400 code', async () => {
                
                await supertest(app).get('/api/location/findLocation').
                expect(400)
            })

        })

    })


    describe ('add location route', () => {

        describe ("if no email is provided", () => {
            //my expectation
            it('it shoud return a 400 code', async () => {
            
                await supertest(app).post('/api/location/addLocation').
                expect(400)
            })
        })

        describe ("if no ip_address  is provided", () => {
            //my expectation
            it('it shoud return a 400 code', async () => {
            
                await supertest(app).post('/api/location/addLocation').
                expect(400)
            })
        })
    })


    describe ('history route', () => {

        describe ("if no email is provided", () => {
            //my expectation
            it('it shoud return a <error_code>', async () => {
            
                await supertest(app).post('/api/location/history').
                expect(404)
            })
        })
    })


})