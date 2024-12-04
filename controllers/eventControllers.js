const {fetchAllEvents, fetchEventById} = require('../models/eventModels')

exports.getAllEvents = ((req, res, next) => {
    return fetchAllEvents()
    .then((events) => {
        res.status(200).send({events:events})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

exports.getEventById = ((req, res, next) => {
    const {eventId} = req.params
    return fetchEventById(eventId)
    .then((event) => {
        res.status(200).send({event:event})
    })
    .catch((err) => {
        console.log('err')
        next(err)
    })
})