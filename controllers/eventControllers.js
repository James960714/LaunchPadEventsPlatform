const {fetchAllEvents, fetchEventById, addToAttendees, createNewEvent, checkEventDoesntExist, updateEvent, removeEvent} = require('../models/eventModels')
const { checkUserExists } = require('../models/userModels')

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

exports.postNewEvent = ((req, res, next) => {
    const {body} = req
    return Promise.all([checkEventDoesntExist(body), createNewEvent(body)])
    .then(([checkEventDoesntExist, postedEvent]) => {
        res.status(201).send({postedEvent: postedEvent})
    })
    .catch((err) => {
        next(err)
    })
})

exports.patchEvent = ((req, res, next) => {
    const {eventId} = req.params
    const {body} = req
    return Promise.all([fetchEventById(eventId), updateEvent(eventId, body)])
    .then(([checkEventExists,updatedEvent]) => {
        res.status(200).send({updatedEvent: updatedEvent})
    })
    .catch((err) => {
        next(err)
    })
})

exports.deleteEvent = ((req, res, next) => {
    const {eventId} = req.params
    return Promise.all([fetchEventById(eventId), removeEvent(eventId)])
    .then(([checkEventExists, deletedCount]) => {
        res.status(204).send({deletedCount: deletedCount})
    })
    .catch((err) => {
        next(err)
    })
})