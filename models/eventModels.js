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
        if (response === null){
            return Promise.reject({status:404, msg: 'not found'})
        }
        return response
    })
}

