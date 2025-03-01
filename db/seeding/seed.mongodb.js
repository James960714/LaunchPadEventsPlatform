const {connection} = require('../../connection')
const {User, Event} = require('../schemaModels')
const mongoose = require('mongoose');



function seed({userData, eventData}) {
    return connection()
    .then(() => {
        User.collection.drop();
    })
    .then(() => {
        Event.collection.drop();
    })
    .then(() => {
        return Promise.all(
            userData.map((user) => {
                const newUser = new User(user);
                return newUser.save()
            })
        );
    })
    .then(() => {
        return Promise.all(
            eventData.map((event) => {
                const newEvent = new Event(event);
                return newEvent.save()
            })
        );
    })
    .then(() => {
        const headUser = User.findOne({ userType: "head" });
        return headUser
    })
    .then((headUser) => {
        if (headUser) {
            console.log("Head user already exists.");
            return;
        }
        const newHeadUser = new User({
            firebaseUID: "zL6iOorDd8QxRcMqLN95EzU4ktI3",
            userName: "AdminHead",
            firstName: "head",
            lastName: "admin",
            userType: "Head",
            dob: "2001-12-05T00:00:00.000Z"
        });
        return newHeadUser.save();
    })
    .then(() => {
        return mongoose.disconnect()
    })
};

module.exports = seed;