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