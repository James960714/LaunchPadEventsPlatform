const {fetchAllUsers, fetchUserById} = require('../models/userModels')

exports.getAllUsers = ((req, res, next) => {
    
    
    return fetchAllUsers()
    .then((users) => {
        res.status(200).send({users:users})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

exports.getUserById = ((req, res, next) => {
    const {userId} = req.params
    return fetchUserById(userId)
    .then((user) => {
        res.status(200).send({user:user})
    })
    .catch((err) => {
        next(err)
    })
})