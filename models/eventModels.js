const {Event} = require('../db/schemaModels')

exports.fetchAllEvents = () => {
    console.log('models landed')
    Event.find({})
    .then((response)=> {
        return response
    });
}

