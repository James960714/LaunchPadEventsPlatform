const app = require('../app');
const seed = require('../db/seeding/seed.mongodb');
const request = require('supertest')

beforeEach(() => seed());

describe("GET /events", () => {
    test("returns status 200 when all events are found", () => {
        return request(app)
        .get("/events")
        .expect(200)
        .then(({body}) => {
            const events = body;
            expect(body.length).toEqual(10);
            events.forEach((event) => {
                expect(event).toEqual(
                    expect.objectContaining({
                        eventId: expect.any(Number),
                        name: expect.any(String),
                        startDateTime: expect.any(Date),
                        endDateTime: expect.any(Date),
                        location: expect.any(String),
                        info: expect.any(String),
                        image: expect.any(String),
                    })
                )
            })
        });
    })
})