# LaunchPadEventsPlatform

This project is a web application for; users to browse events, sign up to them and add them to thier Google calendar, staff / admin to post events and manage them. It consists of an API built with Express.js and a frontend built with React. The application uses the Google calendar API to create events in user's calendars.

Please see here for the counter-part frontend: https://github.com/James960714/LaunchPadEvents-FE

And see here for the live website: https://selectevents.netlify.app

# Backend (Express)
      - RESTful API for event management.
      - Event creation, retrieval, and validation for duplicate events.
      - Middleware for authentication and error handling.
      - Integration with a database (e.g., MongoDB or PostgreSQL).


# Tech Stack
      - Express.js: Backend framework for building APIs.

      - Node.js: JavaScript runtime environment.

      - Database: MongoDB, PostgreSQL, or similar (customize based on your setup).

      - Google Calendar: Google API for interacting with a user's Google calendar.


# Setup Instructions

Clone the Repository

      git clone https://github.com/your-repo/backend.git
      cd backend
Install Dependencies

      npm install

Configure Environment Variables Create a .env file in the root directory with the following variables:

      PORT=9090
      DATABASE_URL=<your_database_url>

The database used was mongoDB so will require your local mongodb path in the database .env file.

Run the seed file for development data and the testing framework used was jest which will automatically run the test.env file. 
     
      npm run seed
      
      npm run test

The see here for instructions on setting up Google Calendar api: https://developers.google.com/calendar/api/quickstart/js

I would reccomend putting the credentials into a .env file as well within db/googlecalendar directory as it is referenced from there in the googleApi file. 


Run the Backend

      npm start

The server will run on http://localhost:9090.

# API Endpoints

GET    '/google-calendar/auth': redirects user to the google oauth2 page

GET    '/google-calendar/auth/redirect': oauth2 page which then redirects the user back to the event page

POST   '/google-calendar/create-event': posts event oto user's google clendar once authorised token has been given

GET    '/events': retrieves all vents in db

GET    '/events/:eventId': retireves and event by eventId

GET    '/users', getAllUsers): retrieves all user in db

GET    '/users/:userName': retirves user by username

POST   '/events/:eventId/attendees: adds a user to the list of attendees for an event

POST   '/events/event': creates an event

PATCH  '/events/:eventId': makes edits to the event object

DELETE '/events/:eventId': removes and event from the db

PATCH  '/users/:userName': edits the user credentials

POST   '/users/user': creates a new user


