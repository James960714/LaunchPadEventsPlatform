const {Schema, mongoose} = require('mongoose')

const userSchema = new Schema({
    userID: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: [true, 'Please enter first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name']
    },
    dob: {
        type: Date,
        required: [true, 'please enter your date of birth']
    },
    address: {
        houseNo: {
            type: String  
        },
        street: {
            type: String,
        },
        townCity:{
            type: String,
        },
        postCode: {
            type: String,
        },
    },
    eventsAttending: {
        type: [Number],
        default: []
    },
    userType: {
        type: String,
        required: true
    },
})


const eventsSchema = new Schema ({
    eventId: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    location:  {
        type: String,
        required: true
    },
    info:  {
        type: String,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
})

const User = mongoose.model('User', userSchema)
const Event = mongoose.model('Event', eventsSchema)

module.exports = {
    User,
    Event
}
