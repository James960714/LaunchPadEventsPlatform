const express = require('express')
const app = express()
const {connection} = require('./connection')
const {getAllEvents, getEventById, postUserToAttendees, postNewEvent} = require('./controllers/eventControllers');
const { customError, badRequest, newInternalError } = require('./error_handling');
const { getAllUsers, getUserById } = require('./controllers/userControllers');


app.use(express.json());
app.use((req, res, next) => {
    return connection()
    .then(() => {
        return next()
    })
})
app.get("/events", getAllEvents);
app.get('/events/:eventId', getEventById)
app.get('/users', getAllUsers)
app.get('/users/:userId', getUserById)
app.patch('/users/:userId', getUserById)
app.post('/events/:eventId/attendees', postUserToAttendees)
app.post('/events/event', postNewEvent)

app.use(badRequest);
app.use(customError);
app.use(newInternalError);

module.exports = app;
    