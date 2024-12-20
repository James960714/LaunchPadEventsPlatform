const express = require('express')
const app = express()
const {connection} = require('./connection')
const {getAllEvents, getEventById, postUserToAttendees, postNewEvent, patchEvent, deleteEvent} = require('./controllers/eventControllers');
const { customError, badRequest, newInternalError } = require('./error_handling');
const { getAllUsers, getUserByUserName, patchUser, postNewUser } = require('./controllers/userControllers');
const router = require('./db/googleCalendar/googleApi')
const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173', 
    'https://launchpadeventsplatform.onrender.com',  
];


const corsOptions = {
    origin: function (origin, callback) {
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true,  
};

app.use(cors(corsOptions))
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
app.get('/users/:userName', getUserByUserName)
app.post('/events/:eventId/attendees', postUserToAttendees)
app.post('/events/event', postNewEvent)
app.patch('/events/:eventId', patchEvent)
app.delete('/events/:eventId', deleteEvent)
app.patch('/users/:userName', patchUser)
app.post('/users/user', postNewUser)

app.use(badRequest);
app.use(customError);
app.use(newInternalError);

module.exports = app;
    