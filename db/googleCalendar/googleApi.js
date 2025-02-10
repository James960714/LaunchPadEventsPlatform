const express = require("express");
const router = express.Router()
const {google} = require('googleapis');
const dotenv = require('dotenv')
const moment = require("moment-timezone")
const calendar = google.calendar({
    version: 'v3',
    auth: process.env.API_KEY
})

dotenv.config({
    path: `${__dirname}/.env.googleApi`
})
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const scopes = ['https://www.googleapis.com/auth/calendar']
const frontendURL = process.env.FRONTEND_URL

router.get('/auth', (req, res) => {
    const {eventId} = req.query
    if(!eventId){
        res.status(400).send({msg: 'eventId not found in /auth'})
    }
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: eventId
    })
    console.log('generated url', url)
    return res.redirect(url)    
});

router.get('/auth/redirect', async (req, res) => {        
    const eventId = req.query.state
    if(!eventId){
        res.status(400).send({msg: 'eventId not found in /auth/redirect'})
    }
    try {
        const tokenCode = req.query.code
        const {tokens} = await oauth2Client.getToken(tokenCode)
        oauth2Client.setCredentials(tokens)
        const redirectFrontendURL = `${frontendURL}/events/${eventId}?authSuccess=true`
        console.log('generated frontend url', redirectFrontendURL)
        return res.redirect(redirectFrontendURL)
    }catch(err){
        return res.status(400).send({msg:err})
    }        
})

router.post('/create-event', async (req, res) => {
    const { summary, description, startDateTime, endDateTime } = req.body;
    try {
        const start = moment.tz(startDateTime, 'Europe/London').format()
        const end = moment.tz(endDateTime, 'Europe/London').format()
        const event = {
            summary,
            description,
            start: { dateTime: start, timeZone: 'Europe/London'},
            end: { dateTime: end, timeZone: 'Europe/London' },
        };

        const result = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            resource: event,
        });
        console.log('event created', result.data.htmlLink) 
        return res.status(201).send({msg: 'Event created'})
    } catch {
        console.log('There was an error contacting the Calendar service: ' + err);
        return res.status(500).send({msg: 'Error creating event'})
    }
});

module.exports = router;