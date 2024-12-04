const {connection} = require('../../connection')
const {User, Event} = require('../schemaModels')
const userData = require('../../data/Test Data/userData')
const eventData = require('../../data/Test Data/eventData')

function seed() {
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
};

module.exports = seed;