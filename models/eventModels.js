const {Event} = require('../db/schemaModels')
const connection = require('../index')


exports.fetchAllEvents = () => {
    return connection()
    .then(() => {
        return Event.find({})
        .lean()
        .then((response)=> {
            return response
        })
    });
}

exports.fetchEventById = (_id) => {
    console.log({_id})
    return connection()
    .then(() => {
        Event.findById({_id})
        .lean()
        .then((response) => {
            console.log(response)
            return response
        })
    })
    .catch(err)
}

