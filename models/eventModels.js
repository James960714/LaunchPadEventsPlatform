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

exports.addToAttendees = (_id, body) => {
    return Event.findById(_id)
    .then((response) => {
        if (response === null){
            return Promise.reject({status:404, msg: 'not found'})
        }
        response.attendees.push(body.user)
        return response.save()
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

exports.createNewEvent = (newEvent) => {
    return Event.create(newEvent)
    .then((response) => {
        return response
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

exports.checkEventDoesntExist = (body) => {
    return Event.find({
        name:body.name,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime,
        location: body.location
    })
    .then((response) => {
        if(response.length > 0){
            return Promise.reject({status: 403, msg: 'event already exists'})
        }
    })
}

exports.updateEvent = (id, eventUpdates) => {
    return Event.findOneAndUpdate({_id:id}, eventUpdates, {new:true})
    .then((response) => {
        return response
    })
}

exports.removeEvent = (id) => {
    return Event.deleteOne({_id: id})
    .then((response) => {
        return response
    })
}