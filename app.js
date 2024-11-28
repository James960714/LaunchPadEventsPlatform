const express = require('express')
const app = express()
const cors = require("cors");
const connection = require('./index')
const {getAllEvents} = require('./controllers/eventControllers')


app.use(express.json);
app.use((req, res, next) => {
    return connection().finally(() => {
        console.log('connected')
        next();
    });
  });
app.use(cors());
app.get("/events", getAllEvents);


app.use((req, res, next) => {
    res.status(404).send({msg: 'not found'})
})

module.exports = app;
    