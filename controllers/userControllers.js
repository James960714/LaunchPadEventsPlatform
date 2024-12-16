const {fetchAllUsers, fetchUserById, updateUser, createNewUser, checkUserDoesntExist} = require('../models/userModels')

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

exports.patchUser = ((req, res, next) => {
    const {userId} = req.params
    const {body} = req
    return Promise.all([fetchUserById(userId), updateUser(userId, body)])
    .then(([checkUserExists,updatedUser]) => {
        res.status(200).send({updatedUser: updatedUser})
    })
    .catch((err) => {
        next(err)
    })
})

exports.postNewUser = ((req, res, next) => {
    const {body} = req
console.log(body)
    return Promise.all([checkUserDoesntExist(body), createNewUser(body)])
    .then(([checkUserDoesntExist,postedUser]) => {
        res.status(201).send({postedUser: postedUser})
    })
    .catch((err) => {
        next(err)
    })
})