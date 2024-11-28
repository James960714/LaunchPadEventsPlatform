const {fetchAllEvents} = require('../models/eventModels')

exports.getAllEvents = ((req, res, next) => {
    console.log('controllers landed')
    return fetchAllEvents()
    .then((response) => {
        res.status(200).send(response)
    })
    .catch(next)
})