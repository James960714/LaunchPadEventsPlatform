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
    //console.log(url)
    res.redirect(url)    
});

router.get('/auth/redirect', async (req, res) => {        
    console.log(req)
    try {
        const tokenCode = req.query.code
      //  console.log(tokenCode)
        const {tokens} = await oauth2Client.getToken(tokenCode)
        //console.log(tokens)
        oauth2Client.setCredentials(tokens)
        res.status(200).send({msg: 'auth works'})
        //console.log(oauth2Client)
    }catch(err){
        //console.log(err)
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