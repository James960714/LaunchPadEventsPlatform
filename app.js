const express = require('express')
const app = express()
const {connection} = require('./connection')
const {getAllEvents, getEventById, postUserToAttendees, postNewEvent, patchEvent, deleteEvent} = require('./controllers/eventControllers');
const { customError, badRequest, newInternalError } = require('./error_handling');
const { getAllUsers, getUserById, patchUser, postNewUser } = require('./controllers/userControllers');
const router = require('./db/googleCalendar/googleApi')
const cors = require('cors');


app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    return connection()
    .then(() => {
        return next()
    })
})

app.use('/google-calendar', router)
app.get("/events", getAllEvents);
app.get('/events/:eventId', getEventById)
app.get('/users', getAllUsers)
app.get('/users/:userId', getUserById)
app.post('/events/:eventId/attendees', postUserToAttendees)
app.post('/events/event', postNewEvent)
app.patch('/events/:eventId', patchEvent)
app.delete('/events/:eventId', deleteEvent)
app.patch('/users/:userId', patchUser)
app.post('/users/user', postNewUser)

app.use(badRequest);
app.use(customError);
app.use(newInternalError);

module.exports = app;
    