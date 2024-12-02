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

