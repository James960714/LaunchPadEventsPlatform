const {User} = require('../db/schemaModels')

exports.fetchAllUsers = () => { 
    return User.find({}).lean().exec()
    .then((response)=> {
        return response
    })
}

exports.fetchUserByUserName = (userName) => {
    return User.find({userName:userName}).lean()
    .then((response) => {
        if (response.length === 0){
            return Promise.reject({status:404, msg: 'not found'})
        }
        return response
    })
}

exports.checkUserExists = (user) => {
    return User.find({userName: user.user})
    .then((response) => {
        if(response.length === 0){
            return Promise.reject({status: 404, msg: 'user not found'})
        }
    })
}

exports.updateUser = (userName, userUpdates) => {
    return User.findOneAndUpdate({userName:userName}, userUpdates, {new:true})
    .then((response) => {
        return response
    })
}

exports.createNewUser = (newUser) => {
    return User.create(newUser)
    .then((response) => {
        return response
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

exports.checkUserDoesntExist = (body) => {
    return User.find({
        userName:body.userName
    })
    .then((response) => {
        if(response.length > 0){
            return Promise.reject({status: 403, msg: 'user already exists'})
        }
    })
}