const app = require('../app');
const seed = require('../db/seeding/seed.mongodb');
const request = require('supertest')
const mongoose = require('mongoose')
const {Event, User} = require('../db/schemaModels')
const testData = require('../data/Test Data/index');
const { convertToMongoObjectId } = require('../utils');
const { postNewEvent } = require('../controllers/eventControllers');



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
describe("POST /events/event", () => {
    test("POST 201: Successfuly creates an event that has the correct properties and data types", () => {
        const newEvent = {
            name: "Robotics Challenge",
            startDateTime: "2025-11-03T09:00:00",
            endDateTime: "2025-11-03T18:00:00",
            location: "Coventry",
            info: "See the latest in robotics compete in exciting challenges.",
            image: "assets/images/event20.jpg"
        }
        const parsedNewEvent = {
            ...newEvent,
            startDateTime: new Date(newEvent.startDateTime),
            endDateTime: new Date(newEvent.endDateTime),
        };

        return request(app)
        .post('/events/event')
        .send(parsedNewEvent)
        .expect(201)
        .then(({body}) => {
            const postedEvent = {
                ...body.postedEvent,
                startDateTime: new Date(body.postedEvent.startDateTime),
                endDateTime: new Date(body.postedEvent.endDateTime),
            };
            expect(postedEvent).toHaveProperty("_id")
            expect(postedEvent).toEqual(
                expect.objectContaining({
                    __v: expect.any(Number),
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
    test("POST 201: Successfuly creates an event that has the correct data", () => {
        const newEvent = {
            name: "Robotics Challenge",
            startDateTime: "2025-11-03T09:00:00",
            endDateTime: "2025-11-03T18:00:00",
            location: "Coventry",
            info: "See the latest in robotics compete in exciting challenges.",
            image: "assets/images/event20.jpg"
        }
        const parsedNewEvent = {
            ...newEvent,
            startDateTime: new Date(newEvent.startDateTime),
            endDateTime: new Date(newEvent.endDateTime),
        };
        return request(app)
        .post('/events/event')
        .send(parsedNewEvent)
        .expect(201)
        .then(({body}) => {
            const postedEvent = {
                ...body.postedEvent,
                startDateTime: new Date(body.postedEvent.startDateTime),
                endDateTime: new Date(body.postedEvent.endDateTime),
            };
            expect(postedEvent).toEqual(
                expect.objectContaining({
                    name: parsedNewEvent.name,
                    startDateTime: parsedNewEvent.startDateTime,
                    endDateTime: parsedNewEvent.endDateTime,
                    location: parsedNewEvent.location,
                    info: parsedNewEvent.info,
                    image: parsedNewEvent.image,
                })
            )
        })
    })
    test("POST 403: Returns error when event matching the Name, Start and End Time and Location of the request already exists", () => {
        const newEvent = {
            name: "Film Premiere",
            startDateTime: "2025-09-10T18:00:00",
            endDateTime: "2025-09-11T23:00:00",
            location: "Newcastle",
            info: "Catch the premiere of an awaited blockbuster.",
            image: "assets/images/event9.jpg",
            attendees: ["user3", "user5", "user7"]
        }
        const parsedNewEvent = {
            ...newEvent,
            startDateTime: new Date(newEvent.startDateTime),
            endDateTime: new Date(newEvent.endDateTime),
        };
        return request(app)
        .post('/events/event')
        .send(parsedNewEvent)
        .expect(403)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe("event already exists")
        })
    })
    test("POST 400: Returns bad request error when newEvent required property is missing (location in this test)", () => {
        const newEvent = {
            name: "Film Premiere",
            startDateTime: "2025-09-10T18:00:00",
            endDateTime: "2025-09-11T23:00:00",
            info: "Catch the premiere of an awaited blockbuster.",
            image: "assets/images/event9.jpg",
            attendees: ["user3", "user5", "user7"]
        }
    
        const parsedNewEvent = {
            ...newEvent,
            startDateTime: new Date(newEvent.startDateTime),
            endDateTime: new Date(newEvent.endDateTime),
        };
        return request(app)
        .post('/events/event')
        .send(parsedNewEvent)
        .expect(400)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe("bad request")
        })
    })
})
describe("PATCH /events/:eventId", () => {
    test("PATCH 200: Updates correct event with specified changes", () => {
        let testEvent;
        const eventUpdates =  {
            name: "Robotics Challenge",
            startDateTime: "2025-11-03T09:00:00",
            endDateTime: "2025-11-03T18:00:00",
            location: "Coventry",
            info: "See the latest in robotics compete in exciting challenges.",
            image: "assets/images/event20.jpg"
        }
        const parsedEventUpdates = {
            ...eventUpdates,
            startDateTime: new Date(eventUpdates.startDateTime),
            endDateTime: new Date(eventUpdates.endDateTime),
        };
        return Event.find({}).lean()
        .then((response) => {
            const {_id} = response[0]
            testEvent = response[0]
            return request(app)
            .patch(`/events/${_id}`)
            .send(eventUpdates)
            .expect(200)
        })
        .then(({body}) => {
            const parsedUpdatedEvent = {
                ...body.updatedEvent,
                _id: convertToMongoObjectId(body.updatedEvent._id),
                startDateTime: new Date(body.updatedEvent.startDateTime),
                endDateTime: new Date(body.updatedEvent.endDateTime),
            };
            expect(parsedUpdatedEvent).toEqual(
                expect.objectContaining({
                    _id: testEvent._id,
                    name: parsedEventUpdates.name,
                    startDateTime: parsedEventUpdates.startDateTime,
                    endDateTime: parsedEventUpdates.endDateTime,
                    location: parsedEventUpdates.location,
                    info: parsedEventUpdates.info,
                    image: parsedEventUpdates.image,
                })
            )
        })
    })
    test("POST 404: Returns not found if Event doesn't exist", () => {
        const eventUpdates =  {
            name: "Robotics Challenge",
            startDateTime: "2025-11-03T09:00:00",
            endDateTime: "2025-11-03T18:00:00",
            location: "Coventry",
            info: "See the latest in robotics compete in exciting challenges.",
            image: "assets/images/event20.jpg"
        }
        return request(app)
        .patch('/events/67588152b1187052e3529f48')
        .send(eventUpdates)
        .expect(404)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe('not found')
        })        
    })
})
describe("DELETE /events/:eventId", () => {
    test('DELETE 204:removes Event when given valid comment_id', () => {
        return Event.find({})
        .then((response) => {
            const {_id} = response[0]
            return request(app)
            .delete(`/events/${_id}`)
            .expect(204)   
        })
    })
    test('DELETE 404: returns not found error when passed non-existent valid ID', () => {
        return request(app)
        .delete('/events/67588152b1187052e3529f48')
        .expect(404)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe('not found')
        })
    })
    test('DELETE 400: returns bad request error for invalid id', () => {
        return request(app)
        .delete('/events/invalidId')
        .expect(400)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe('bad request')
        })
    })
})
describe("PATCH /users/:userId", () => {
    test("PATCH 200: Updates correct user with specified changes", () => {
        let testUser;
        const userUpdates = {
            userName: "user20",
            firstName: "Lily",
            lastName: "King",
            dob: "1989-03-11T00:00:00.000Z",
            address: {
                houseNo: "42",
                street: "Cedar Avenue",
                townCity: "Norwich",
                postCode: "NR1 4AA"
            },
            eventsAttending: ['674d971e5c0a94b4de6377af'],
            userType: "Customer"
        }
        return User.find({}).lean()
        .then((response) => {
            const {_id} = response[0]
            testUser = response[0]
            return request(app)
            .patch(`/users/${_id}`)
            .send(userUpdates)
            .expect(200)
        })
        .then(({body}) => {
            const parsedUpdatedUser = {
                ...body.updatedUser,
                _id: convertToMongoObjectId(body.updatedUser._id),
            };
            expect(parsedUpdatedUser).toEqual(
                expect.objectContaining({
                    _id: testUser._id,
                    __v: testUser.__v,
                    userName: userUpdates.userName,
                    firstName: userUpdates.firstName,
                    lastName: userUpdates.lastName,
                    address: expect.objectContaining({
                        houseNo: userUpdates.address.houseNo,
                        postCode: userUpdates.address.postCode,
                        street: userUpdates.address.street,
                        townCity: userUpdates.address.townCity,
                    }),
                    dob: userUpdates.dob,
                    eventsAttending: userUpdates.eventsAttending, 
                    userType: userUpdates.userType,
                })
            )
        })
    })
    test("POST 404: Returns not found if User doesn't exist", () => {
        const userUpdates = {
            userName: "user20",
            firstName: "Lily",
            lastName: "King",
            dob: "1989-03-11T00:00:00.000Z",
            address: {
                houseNo: "42",
                street: "Cedar Avenue",
                townCity: "Norwich",
                postCode: "NR1 4AA"
            },
            eventsAttending: ['674d971e5c0a94b4de6377af'],
            userType: "Customer"
        }
        return request(app)
        .patch('/users/67588152b1187052e3529f48')
        .send(userUpdates)
        .expect(404)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe('not found')
        })        
    })
})
describe("POST /users/user", () => {
    test("POST 201: Successfuly creates a new user that has the correct properties and data types", () => {
        const newUser = {
            userName: 'user999',
            firstName: 'John',
            lastName: "Smith",
            dob: "1987-06-22T00:00:00.000Z"
        }
        const parsedNewUser = {
            ...newUser,
            dob: new Date(newUser.dob),
        };

        return request(app)
        .post('/users/user')
        .send(parsedNewUser)
        .expect(201)
        .then(({body}) => {
            const postedUser = {
                ...body.postedUser,
                dob: new Date(body.postedUser.dob),
            };
            expect(postedUser).toHaveProperty("_id")
            expect(postedUser).toEqual(
                expect.objectContaining({
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    userName: expect.any(String),
                    dob: expect.any(Date)
                })
            )
        })
    });
    test("POST 201: Successfuly creates a new User that has the correct data", () => {
        const newUser = {
            userName: 'user999',
            firstName: 'John',
            lastName: "Smith",
            dob: "1987-06-22T00:00:00.000Z"
        }
        const parsedNewUser = {
            ...newUser,
            dob: new Date(newUser.dob),
        };
        return request(app)
        .post('/users/user')
        .send(parsedNewUser)
        .expect(201)
        .then(({body}) => {
            const postedUser = {
                ...body.postedUser,
                dob: new Date(body.postedUser.dob),
            };
            expect(postedUser).toEqual(
                expect.objectContaining({
                    firstName: parsedNewUser.firstName,
                    lastName: parsedNewUser.lastName,
                    userName: parsedNewUser.userName,
                    dob: parsedNewUser.dob
                })
            )
        })
    })
    test("POST 403: Returns error when user matching the userName already exists", () => {
        const newUser = {
            userName: "user2",
            firstName: "Jack",
            lastName: "Taylor",
            dob: "1990-03-22T00:00:00.000Z"
        }
        const parsedNewUser = {
            ...newUser,
            dob: new Date(newUser.dob),
        };
        return request(app)
        .post('/users/user')
        .send(parsedNewUser)
        .expect(403)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe("user already exists")
        })
    })
    test("POST 400: Returns bad request error when newUser required property is missing (lastName in this test)", () => {
        const newUser = {
            userName: "user2",
            firstName: "Jack",
            dob: "1990-03-22T00:00:00.000Z"
        }
        const parsedNewUser = {
            ...newUser,
            dob: new Date(newUser.dob),
        };
        return request(app)
        .post('/users/user')
        .send(parsedNewUser)
        .expect(400)
        .then(({body}) => {
            const error = body
            expect(error.msg).toBe("bad request")
        })
    })
})
/*
describe("Testing router works", () => {
        test("same as above", async () => {
            const event = {
                summary: 'newEvent',
                location: '800 Howard St., San Francisco, CA 94103',
                description: 'A chance to hear more about Google\'s developer products.',
                start: { dateTime: '2024-11-29T09:00:00-00:00', timeZone: 'Europe/London' },
                end: { dateTime: '2024-11-29T17:00:00-00:00', timeZone: 'Europe/London' },
                recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
                attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
                reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 24 * 60 }, { method: 'popup', minutes: 10 }] },
            };
        
            return request(app)
            .get('/google-calendar/auth')
            .expect(200)
            .then(({body}) => {
                expect(body.msg).toBe('logged in');
            })
        });
    })
    */        