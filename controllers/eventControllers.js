const {fetchAllEvents, fetchEventById, addToAttendees} = require('../models/eventModels')
const { checkUserExists } = require('../models/userModels')

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
        next(err)
    })
})

exports.postUserToAttendees = ((req, res, next) => {
    const {eventId} = req.params
    const {body} = req
    return Promise.all([checkUserExists(body),addToAttendees(eventId, body)])
    .then(([checkUser, eventSignedUpTo]) => {
        res.status(201).send({eventSignedUpTo: eventSignedUpTo})
    })
    .catch((err) => {
        next(err)
    })
})