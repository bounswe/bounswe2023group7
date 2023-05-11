import supertest from "supertest";
import app from "../app.js";
import axios from "axios";

describe('events', () =>{

    describe('create event route', () =>{

        describe('if date is invalid', () => {

            it('it should return a 400 code', async () =>{
                body={
                    "eventName" : "Dance",
                    "eventDate" : { "year": 2022, "month": 13, "day": 5},
                    "eventTime" : "14:40",
                    "eventLocation" : "Tekirdağ, Çorlu"
                }
                await supertest(app)
                .post('api/events/createEvent')
                .send(body)
                .expect(400)
            })
        })

        describe('if time is in invalid format', () => {

            it('it should return a 400 code', async () =>{
                body={
                    "eventName" : "Dance",
                    "eventDate" : { "year": 2022, "month": 11, "day": 5},
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
                    "eventDate" : { "year": 2022, "month": 11, "day": 5},
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

