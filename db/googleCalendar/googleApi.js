const express = require("express");
const router = express.Router()
const {google} = require('googleapis');
const dotenv = require('dotenv')
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
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: eventId
    })
    //console.log(url)
    res.redirect(url)    
});

router.get('/auth/redirect', async (req, res) => {        
    const eventId = req.query.state.eventId
    try {
        const tokenCode = req.query.code
        const {tokens} = await oauth2Client.getToken(tokenCode)
        oauth2Client.setCredentials(tokens)
        const redirectFrontendURL = `${frontendURL}/events/${eventId}?authSuccess=true`
        res.redirect(redirectFrontendURL)
    }catch(err){
        res.status(400).send({msg:err})
    }        
})

router.post('/create-event', async (req, res) => {
    const { summary, description, startDateTime, endDateTime } = req.body;
    try {
        const event = {
            summary,
            description,
            start: { dateTime: startDateTime, timeZone: 'UTC' },
            end: { dateTime: endDateTime, timeZone: 'UTC' },
        };

        const result = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            resource: event,
        });
        console.log('event created', result.data.htmlLink) 
    } catch {
        console.log('There was an error contacting the Calendar service: ' + err);
            return;
    }

    res.status(201).send({msg:'event created'})
});

module.exports = router;