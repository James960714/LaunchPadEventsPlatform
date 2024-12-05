const app = require('../app');
const seed = require('../db/seeding/seed.mongodb');
const request = require('supertest')
const {connection} = require('../connection')
const mongoose = require('mongoose')
const {Event} = require('../db/schemaModels')
const testData = require('../data/Test Data/index')

beforeEach(() => seed(testData));
afterAll(() => {
    return mongoose.disconnect()
})
describe("GET /events", () => {
    test("GET 200: returns status 200 when all events are found", () => {
        return request(app)
        .get("/events")
        .expect(200)
        .then(({body}) => {
            const events = body.events;
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
            return request(app)
            .get(`/events/${_id}`)
            .expect(200)
        })
        .then(({body}) => {
            const event = body.event
            expect(typeof(event)).toBe('object')
            expect(Array.isArray(event)).toBe(false)
        })
    })
    test("GET 200: returns correct event object based on passed ID", () => {
        let testEvent = {}
        return connection()
        .then(() => {
            return Event.find({}).lean()
        })
        .then((response) => {
            testEvent = response[0]
            const {_id} = response[0]
            return request(app)
            .get(`/events/${_id}`)
            .expect(200)
        })
        .then(({body}) => {
            const event = body.event
            //Express serialises the response body which is passed to it from mongodb. To test the date responses still work as Date data types, parsedEvent changes them into JavaScript date types. 
            //const convertId = {_id: ObjectId(event._id)}
            const parsedEvent = {
                ...event,
                _id: mongoose.Types.ObjectId.createFromHexString(event._id),
                startDateTime: new Date(event.startDateTime),
                endDateTime: new Date(event.endDateTime),
            };
            expect(parsedEvent).toEqual(
                expect.objectContaining({
                    _id: testEvent._id,
                    __v: testEvent.__v,
                    name: testEvent.name,
                    startDateTime: testEvent.startDateTime,
                    endDateTime: testEvent.endDateTime,
                    location: testEvent.location,
                    info: testEvent.info,
                    image: testEvent.image,
                })
            )
        })
    })
    test("returns status 404 when passed a valid but non-existent ID", () => {
        return request(app)
        .get('/events/67519d9c73fa4abb02b16ef6')
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
})