const app = require('../app');
const seed = require('../db/seeding/seed.mongodb');
const request = require('supertest')
const mongoose = require('mongoose')
const {Event, User} = require('../db/schemaModels')
const testData = require('../data/Test Data/index');
const { convertToMongoObjectId } = require('../utils');

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
        return Event.find({}).lean()
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
        return Event.find({}).lean()
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
                _id: convertToMongoObjectId(event._id),
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
describe("GET /users", () => {
    test("GET 200: returns status 200 when all users are found and object properties are correct, and events attending array items can be converted into the correct data type", () => {
        return request(app)
        .get("/users")
        .expect(200)
        .then(({body}) => {
            const users = body.users;
            users.forEach((user) => {
                expect(user).toHaveProperty("_id")
                expect(user).toEqual(
                    expect.objectContaining({
                        __v: expect.any(Number),
                        userName: expect.any(String),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        address: expect.objectContaining({
                            houseNo: expect.any(String),
                            postCode: expect.any(String),
                            street: expect.any(String),
                            townCity: expect.any(String),
                        }),
                        dob: expect.any(String),
                        eventsAttending: expect.any(Array), 
                        userType: expect.any(String),
                    })
                )
                if(user.eventsAttending.length !== 0){
                    const objectIdArray = user.eventsAttending.every((event) => {
                        return convertToMongoObjectId(event)
                    })
                    expect(objectIdArray).toBe(true)
                }
            })
        });
    })
    test("GET 200: returns the correct amount of users", () => {
        return request(app)
        .get("/users")
        .expect(200)
        .then(({body}) => {
            const users = body.users;
            expect(users.length).toEqual(10);
        })
    })
})
describe("GET /users/:userId", () => {
    test("GET 200: returns single user object", () => {
        return User.find({}).lean()
        .then((response) => {
            const {_id} = response[0]
            return request(app)
            .get(`/users/${_id}`)
            .expect(200)
        })
        .then(({body}) => {
            const user = body.user
            expect(typeof(user)).toBe('object')
            expect(Array.isArray(user)).toBe(false)
        })
    })
    test("GET 200: returns correct user object based on passed ID", () => {
        let testUser = {}
        return User.find({}).lean()
        .then((response) => {
            testUser = response[0]
            const {_id} = response[0]
            return request(app)
            .get(`/users/${_id}`)
            .expect(200)
        })
        .then(({body}) => {
            const user = body.user
            //Express serialises the response body which is passed to it from mongodb. To test the date responses still work as Date data types and Ids as ObjectId data types, parsedUser changes them into JavaScript and MongoDB data types. 
            const parsedUser = {
                ...user,
                _id: convertToMongoObjectId(user._id),
                dob: new Date(user.dob)
            };
            expect(parsedUser).toEqual(
                expect.objectContaining({
                    _id: testUser._id,
                    __v: testUser.__v,
                    userName: testUser.userName,
                    firstName: testUser.firstName,
                    lastName: testUser.lastName,
                    address: expect.objectContaining({
                        houseNo: testUser.address.houseNo,
                        postCode: testUser.address.postCode,
                        street: testUser.address.street,
                        townCity: testUser.address.townCity,
                    }),
                    dob: testUser.dob,
                    eventsAttending: testUser.eventsAttending, 
                    userType: testUser.userType,
                })
            )
        })
    })
    test("returns status 404 when passed a valid but non-existent ID", () => {
        return request(app)
        .get('/users/67519d9c73fa4abb02b16ef6')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('not found')
        })
    })
            
    test("returns status 400 when passed an invalid ID", () => {
        return request(app)
        .get('/users/InvalidID')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('bad request')
        })
    })
})
describe("POST /events/:eventId/attendees", () => {
    test("POST 201: Adds correct userName to the correct event attendees list", () => {
        const singedUpUserBody = {user: "user3"}
        let testEvent;
        return Event.find({}).lean()
        .then((response) => {
            testEvent = response[0]
            const {_id} = response[0]
            return request(app)
            .post(`/events/${_id}/attendees`)
            .send(singedUpUserBody)
            .expect(201)
        })
        .then(({body}) => {
            const eventSignedUpTo = {
                ...body.eventSignedUpTo,
                _id: convertToMongoObjectId(body.eventSignedUpTo._id),
            };
   
            expect(eventSignedUpTo.attendees).toContain(singedUpUserBody.user)
            expect(eventSignedUpTo._id).toEqual(testEvent._id)
            expect(eventSignedUpTo.attendees.length).toEqual(4)
        })
    })
    test("POST 404: Returns not found response when passed a valid but non-existent event Id", () => {
        const singedUpUserBody = {user: "user3"}
        return request(app)
        .post('/events/67519d9c73fa4abb02b16ef6/attendees')
        .send(singedUpUserBody)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('not found')
        })
    })
    test("POST 400: Returns bad request response when passed an invalid event Id", () => {
        const singedUpUserBody = {user: "user3"}
        return request(app)
        .post('/events/invalidId/attendees')
        .send(singedUpUserBody)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('bad request')
        })
    })
    test("POST 404: Returns not found response when passed a non-existent user in post body", () => {
        const singedUpUserBody = {user: "user999"}
        return Event.find({}).lean()
        .then((response) => {
            const {_id} = response[0]
            return request(app)
            .post(`/events/${_id}/attendees`)
            .send(singedUpUserBody)
            .expect(404)
        })
        .then(({body}) => {
            expect(body.msg).toBe('not found')
        })
    })
})