const express = require('express')
const app = express()

const {getAllEvents, getEventById} = require('./controllers/eventControllers')


app.use(express.json());

app.get("/events", getAllEvents);
app.get('/events/:eventId', getEventById)



module.exports = app;
    