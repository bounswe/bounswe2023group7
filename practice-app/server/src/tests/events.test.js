import supertest from "supertest";
import app from "../app.js";
import axios from "axios";

describe('events', () =>{

    describe('create event route', () =>{

        describe('if time is in invalid format', () => {

            it('it should return a 400 code', async () =>{
                body={
                    "eventName" : "Dance",
                    "eventTime" : "14,70",
                    "eventLocation" : "Tekirdağ, Çorlu"
                }
                await supertest(app)
                .post('api/events/createEvent')
                .send(body)
                .expect(400)
            })
        })

        describe('if event name is not given', () => {

            it('it should return a 400 code', async () =>{
                body={
                    "eventName" : "",
                    "eventTime" : "14:10",
                    "eventLocation" : "Konya, Selcuklu"
                }
                await supertest(app)
                .post('api/events/createEvent')
                .send(body)
                .expect(400)
            })
        })
    })
})

