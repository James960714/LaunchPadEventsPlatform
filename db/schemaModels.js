const {Schema, mongoose} = require('mongoose')

const userSchema = new Schema({
    firebaseUID: {
        type: String,
    },
    userName: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
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
            type: String,
            default: ''  
        },
        street: {
            type: String,
            default: ''
        },
        townCity:{
            type: String,
            default: ''
        },
        postCode: {
            type: String,
            default: ''
        },
    },
    eventsAttending: {
        type: [String],
        default: []
    },
    userType: { 
        type: String, 
        enum: ["Customer", "Staff", "Head"], 
        default: "Customer" 
    },
})


const eventsSchema = new Schema ({
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
        default:""
    },
    attendees: {
        type: [String],
        default: []
    }
})

const User = mongoose.model('User', userSchema)
const Event = mongoose.model('Event', eventsSchema)

module.exports = {
    User,
    Event
}
