# LaunchPadEventsPlatform - Backend

This project is a web application for; users to browse events, sign up to them and add them to thier Google calendar, staff / admin to post events and manage them. It consists of an API built with Express.js and a frontend built with React. The application uses the Google calendar API to create events in user's calendars.

**Please see here for the counter-part frontend (_see readMe for set up and test accounts_): https://github.com/James960714/LaunchPadEvents-FE**

**And see here for the live website: https://selectevents.netlify.app**

# Test it out:

Test Accounts: 

    Head Account:
        email: admintest@admin.com 
        password: testp1

    Staff Account:
        email: teststaff1@admin.com 
        password: testp1
        
    Test User Account:
        email: testUserAccount@email.com
        password: testPassword1

For a test user account you can also use the create account functionality on the website.

# Backend (Express)
- RESTful API for event management.
- Event creation, retrieval, and validation for duplicate events.
- Middleware for authentication and error handling.
- Integration with a database (MongoDB).


# Tech Stack
- Express.js: Backend framework for building APIs.
- Node.js: JavaScript runtime environment.
- Database: MongoDB.
- Google Calendar: Google API for interacting with a user's Google calendar.


# Setup Instructions

1. Clone the Repository

            git clone [https://github.com/your-repo/backend.git](https://github.com/James960714/LaunchPadEventsPlatform.git)
   
            cd LaunchPadEventsPlatform
   
3. Install Dependencies

            npm install

4. Configure Environment Variables Create a .env file in the root directory with the following variables:

            PORT=9090
            DATABASE_URL=<your_database_url>

- The database used was mongoDB so will require your local mongodb path in the database .env file.

4. Run the seed file for development data and the testing framework used was jest which will automatically run the test.env file. 
     
            npm run seed
                  
            npm run test

5. Then see here for instructions on setting up Google Calendar api: https://developers.google.com/calendar/api/quickstart/js

- I would reccomend putting the credentials into a .env file as well within db/googlecalendar directory as it is referenced from there in the googleApi file. 


6. Run the Backend

            npm start

- The server will run on http://localhost:9090.

# API Endpoints

- GET    '/google-calendar/auth':

      Redirects user to the google oauth2 page

- GET    '/google-calendar/auth/redirect':

      Oauth2 page which then redirects the user back to the event page

- POST   '/google-calendar/create-event':

      Posts event onto user's google clendar once authorised token has been given

- GET    '/events':

      Retrieves all events in db

- GET    '/events/:eventId':

      Retireves event by eventId

- GET    '/users', getAllUsers):

      Retrieves all user in db

- GET    '/users/:userName':

      Retirves user by username

- POST   '/events/:eventId/attendees:

      Adds a user to the list of attendees for an event

- POST   '/events/event':

      Creates an event

- PATCH  '/events/:eventId':

      Makes edits to the event object

- DELETE '/events/:eventId':

      Removes event from the db

- PATCH  '/users/:userName':

      Edits the user credentials

- POST   '/users/user':

      Creates a new user


# Launchpad Events Platform - Frontend

This is the frontend for the Launchpad Events Platform, a web application designed to facilitate event management and user interaction. The app is built using React and leverages Firebase for user authentication. It also integrates with a custom backend and Google Calendar API for extended functionality.

Note: The web app uses the free version of render for the backend so some requests may take their time coming through if the app hasn't been used in a while. Try waiting 1-2 minutes for initial requests and refreshing / restarting if the web application still doesn't respond. 


# Test it out:

Test Accounts: 

    Head Account:
        email: admintest@admin.com 
        password: testp1

    Staff Account:
        email: teststaff1@admin.com 
        password: testp1
        
    Test User Account:
        email: testUserAccount@email.com
        password: testPassword1

For a test user account you can also use the create account functionality on the website.

To see this live: https://selectevents.netlify.app/events 

# Features

General Users

- View Events: Users can browse all available events.
- Sign Up for Events: Users can register their interest in events and have them added to their profile.
- Add Events to Google Calendar: Signed-up events can be added directly to the user's Google Calendar.
- Register an Account: New users can create an account using the app's registration system.

Staff

- Create Events: Staff members can create new events, including setting event details such as name, time, location, and description.
- Delete Events: Staff members can remove events as needed.
- Dynamic Role-Based Rendering
- The app dynamically adjusts its interface and functionality based on the current user's role:

Users: Have access to user-specific features like signing up for events.

Staff: Gain access to staff-specific tools like creating and deleting events.

Authentication Integration: Firebase authentication ensures that users are logged in before accessing event features, and roles are determined by syncing Firebase users with a MongoDB-based user management system.


# View Locally

    npm run dev

  select the local host link and view
