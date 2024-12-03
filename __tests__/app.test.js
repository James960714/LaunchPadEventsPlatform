const app = require('../app');
const seed = require('../db/seeding/seed.mongodb');
const request = require('supertest')
const connection = require('../index')
const mongoose = require('mongoose')
const {Event} = require('../db/schemaModels')

beforeEach(() => seed());
afterAll(() => {
    return connection()
    .then(()=> {
        mongoose.disconnect()
        return
    })
})
describe("GET /events", () => {
    test("GET 200: returns status 200 when all events are found", () => {
        return request(app)
        .get("/events")
        .expect(200)
        .then(({body}) => {
            const events = body.events;
            console.log(events)
            events.forEach((event) => {
                expect(event).toHaveProperty("_id")
                expect(event).toEqual(
                    expect.objectContaining({
                        __v: expect.any(Number),
                        name: expect.any(String),
                        startDateTime: expect.any(String),
                        endDateTime: expect.any(String),
                        location: expect.any(String),
                        info: expect.any(String),
                        image: expect.any(String),
                    })
                )
            })
        });
    })
    test("GET 200: returns status 200 returns the correct amount of events", () => {
        return request(app)
        .get("/events")
        .expect(200)
        .then(({body}) => {
            const events = body.events;
            expect(events.length).toEqual(10);
        })
    })
})
describe("GET /events/:eventId", () => {
    test("GET 200: returns single event object", () => {
        return connection()
        .then(() => {
            return Event.find({}).lean()
        })
        .then((response) => {
            const {_id} = response[0]
            console.log(_id)
            return request(app)
            .get(`/events/${_id}`)
            .expect(200)
        })
        .then(({body}) => {
            const event = body.event
            console.log(event)
            expect(typeof(event)).toBe('Object')
            expect(Array.isArray(event)).toBe(false)
        })
    })
    /*
    test("returns status 404 when passed a valid but non-existent ID", () => {
        return request(app)
        .get('/events/999')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('not found')
        })
    })
    test("returns status 400 when passed an invalid ID", () => {
        return request(app)
        .get('/events/InvalidID')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('bad request')
        })
    })
*/
})