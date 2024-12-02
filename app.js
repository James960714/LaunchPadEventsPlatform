const express = require('express')
const app = express()

const {getAllEvents} = require('./controllers/eventControllers')


app.use(express.json());

app.get("/api/events", getAllEvents);


app.use((req, res, next) => {
    res.status(404).send({msg: 'not found'})
})

module.exports = app;
    