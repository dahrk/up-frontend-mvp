const router = require("express").Router();
const { google } = require("googleapis");
const passport = require("passport");
const passportMiddleware = require("auth/passportMiddleware.js");

const GOOGLE_CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.app.created",
];

/*
Need to do:
Database storage for client oath tokens

Flow is user authentication on front-end 
-> prompts popup with google calendar consent 
-> pop-up closes and list of calendars is shown 
-> choose 1 calendar to use for UP event processing
-> pull events from target calendar and analyze
-> create secondary calendar with principle reminders w/ alerts 15 minutes before actual event
*/

router
  .route("/calendar")
  .get(
    passport.authenticate("google", { scope: GOOGLE_CALENDAR_SCOPES }),
    passportMiddleware,
    function (req, res) {}
  );

function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

module.exports = router;
