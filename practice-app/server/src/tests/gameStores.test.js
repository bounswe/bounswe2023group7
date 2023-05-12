import supertest from "supertest";
import app from "../app.js"

describe('gameStores', () =>{


    describe ('add game to cart route', () => {

        describe ("if no email is provided", () => {
            //my expectation
            it('it should return a 400 code', async () => {
            
                await supertest(app).post('/api/gameprices/add-cart').
                expect(400)
            })
        })

        describe ("if no game name is provided", () => {
            //my expectation
            it('it should return a 400 code', async () => {
            
                await supertest(app).post('/api/gameprices/add-cart').
                expect(400)
            })
        })
    })


    describe ('get games by email from cart', () => {

        describe ("if no email is provided", () => {
            //my expectation
            it('it should return a 400 code', async () => {
            
                await supertest(app).post('/api/gameprices/').
                expect(400)
            })
        })
    })

    describe ('get game information by name', () => {

        describe ("if no game name is provided", () => {
            //my expectation
            it('it should return a 400 code', async () => {
            
                await supertest(app).post('/api/gameprices/game').
                expect(400)
            })
        })
    })


})