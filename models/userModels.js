const {User} = require('../db/schemaModels')

exports.fetchAllUsers = () => { 
    return User.find({}).lean().exec()
    .then((response)=> {
        return response
    })
}

exports.fetchUserById = (_id) => {
    return User.findById(_id).lean()
    .then((response) => {
        if (response === null){
            return Promise.reject({status:404, msg: 'not found'})
        }
        return response
    })
}

exports.checkUserExists = (user) => {
    return User.find({userName: user.user})
    .then((response) => {
        if(response.length === 0){
            return Promise.reject({status: 404, msg: 'not found'})
        }
    })
}

exports.updateUser = (id, userUpdates) => {
    return User.findOneAndUpdate({_id:id}, userUpdates, {new:true})
    .then((response) => {
        return response
    })
}

exports.createNewUser = (newUser) => {
    console.log('create')
    return User.create(newUser)
    .then((response) => {
        return response
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

exports.checkUserDoesntExist = (body) => {
    console.log('check')
    return User.find({
        userName:body.userName
    })
    .then((response) => {
        if(response.length > 0){
            return Promise.reject({status: 403, msg: 'user already exists'})
        }
    })
}