const express = require('express')
const app = express()
const {connection} = require('./connection')
const {getAllEvents, getEventById} = require('./controllers/eventControllers')


app.use(express.json());
app.use((req, res, next) => {
    return connection()
    .then(() => {
        return next()
    })
})
app.get("/events", getAllEvents);
app.get('/events/:eventId', getEventById)



module.exports = app;
    