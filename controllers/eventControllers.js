const {fetchAllEvents, fetchEventById} = require('../models/eventModels')

exports.getAllEvents = ((req, res, next) => {
    return fetchAllEvents()
    .then((events) => {
        res.status(200).send({events:events})
    })
    .catch((err) => {
        next(err)
    })
})

exports.getEventById = ((req, res, next) => {
    const {eventId} = req.params
    console.log(eventId)
    return fetchEventById(eventId)
    .then((event) => {
        console.log('then')
        res.status(200).send({event:event})
    })
    .catch((err) => {
        console.log('err')
        next(err)
    })
})