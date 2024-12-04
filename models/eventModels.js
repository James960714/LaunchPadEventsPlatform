const {Event} = require('../db/schemaModels')


exports.fetchAllEvents = () => {
    return Event.find({}).lean().exec()
    .then((response)=> {
        return response
    })
}

exports.fetchEventById = (_id) => {
    return Event.findById(_id).lean()
    .then((response) => {
        return response
    })
}

