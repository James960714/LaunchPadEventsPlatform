const app = require('../app');
const seed = require('../db/seeding/seed.mongodb');
const request = require('supertest')
const connection = require('../index')
const mongoose = require('mongoose')

beforeEach(() => seed());
afterAll(() => {
    return connection()
    .then(()=> {
        mongoose.disconnect()
        return
    })
})
describe("GET /api/events", () => {
    test("returns status 200 when all events are found", () => {
        return request(app)
        .get("/api/events")
        .expect(200)
        .then(({body}) => {
            const events = body.events;
            expect(events.length).toEqual(10);
            events.forEach((event) => {
                expect(event).toEqual(
                    expect.objectContaining({
                        __v: expect.any(Number),
                        _id: expect.any(String),
                        eventId: expect.any(Number),
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
})