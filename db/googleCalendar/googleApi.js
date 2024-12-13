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

router.get('/auth', (req, res) => {
    
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    })
    res.redirect(url)    
});

router.get('/auth/redirect', async (req, res) => {
    try{
        const tokenCode = req.query.code
        const {tokens} = await oauth2Client.getToken(tokenCode)
        oauth2Client.setCredentials(tokens)
        res.status(200).send({msg: 'auth works'})
    }catch{
        res.status(400).send({msg:'not setting credentials'})
    }
})


router.get('/create-event', async (req, res) => {
    
    try {
      const result =  await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            resource: {
                "summary": 'Test Event',
                "description": 'My event',
                "start": {
                    "dateTime": "2024-12-12T09:00:00-00:00",
                    'timeZone': 'Europe/London',
                },
                'end': {
                    'dateTime': '2024-12-12T17:00:00-00:00',
                    'timeZone': 'Europe/London',
                }
            },
        })
        console.log('event created', result.data.htmlLink) 
    } catch {
        console.log('There was an error contacting the Calendar service: ' + err);
            return;
    }

    res.status(201).send({msg:'event created'})
});

module.exports = router;