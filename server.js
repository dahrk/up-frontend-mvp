const express = require("express");
const { Client } = require("@notionhq/client");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

require("dotenv").config();

//server initialization
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//google api initialization
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.app.created",
];
const TOKEN_PATH = "auth/token.json";

fs.readFile("auth/desktop-google-oath.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

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

app.get("/api/ping", (req, res) => {
  res.send("Hello world!");
});

app.post("/api/addPrinciple", (req, res) => {
  (async () => {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DB,
      },
      properties: {
        "Title (Principle or Problem)": {
          title: [
            {
              text: {
                content: req.body.title,
              },
            },
          ],
        },
        "Notes (detailed action items)": {
          rich_text: [
            {
              text: {
                content: req.body.notes,
              },
            },
          ],
        },
        Tags: {
          multi_select: [
            {
              id: "75256f40-6161-4c7b-b947-ed8b26a4e5c2",
              name: "**Principle**",
              color: "red",
            },
          ],
        },
      },
    });
    console.log(response);
  })();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
