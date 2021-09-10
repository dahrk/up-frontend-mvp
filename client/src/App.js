import "./App.css";

import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

function App() {
  const clientId =
    "165194383544-aiqotfhsn1v8tt36ljvegalvp0vhscri.apps.googleusercontent.com";
  const scopes =
    "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.app.created";

  const [prototypeEventLink, setPrototypeEventLink] = useState(0);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: clientId,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: scopes,
      });
    });
  }, []);

  function prototypeCalendarFunction() {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 1,
        orderBy: "startTime",
      })
      .then(function (response) {
        const events = response.result.items;
        const event = events[0];
        const newEvent = {
          summary: "Power-pose",
          description: `Reminder to power-pose when attending ${event.summary}`,
          location: event.location,
          start: event.start,
          end: event.end,
          reminders: { useDefault: true },
        };

        gapi.client.calendar.events
          .insert({
            calendarId: "primary",
            resource: newEvent,
          })
          .execute((event) => {
            setPrototypeEventLink(event.htmlLink);
            console.log(event.htmlLink);
          });

        console.log(events);
      });
  }

  function handleAuthSignin(action) {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        console.log("Signing in");
        switch (action) {
          case "prototype":
            prototypeCalendarFunction();
            break;
          default:
            console.log("Signed in");
        }
      });
  }

  function handleAuthSignout() {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => console.log("Signing out"));
  }

  return (
    <div className="App">
      <div>
        <h4>Google Calendar Login and Authentication</h4>
      </div>
      <div>
        <button onClick={() => handleAuthSignin("prototype")}>
          GAPI Sign-in and prototype execution
        </button>
        <button onClick={() => handleAuthSignout()}>GAPI Sign-out</button>
      </div>
      <div>
        {prototypeEventLink ? (
          <p>
            New event here:{" "}
            <a href={prototypeEventLink}>{prototypeEventLink}</a>
          </p>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default App;
