const {fetchAllEvents} = require('../models/eventModels')

exports.getAllEvents = ((req, res, next) => {
    return fetchAllEvents()
    .then((events) => {
        res.status(200).send({events:events})
    })
    
})