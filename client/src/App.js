import "./App.css";

import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import gapi from "gapi-client";

function App() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleNotionSubmit = async () => {
    console.log(JSON.stringify({ title: title, notes: notes }));
    const response = await fetch("/api/addPrinciple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, notes: notes }),
    });
    console.log(response);
  };

  /*
  function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }
  */

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="App">
      <div>
        <h4>Sick demo principles</h4>
        <label>Principle title</label>
        <input
          type="text"
          name="principleTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Principle notes</label>
        <input
          type="text"
          name="principleNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button disabled onClick={() => handleNotionSubmit}>
          Add Principle
        </button>
      </div>
      <div>
        <h4>Google Calendar Login and Authentication</h4>
        <GoogleLogin
          clientId="165194383544-aiqotfhsn1v8tt36ljvegalvp0vhscri.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          scopes={
            "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.app.created"
          }
        />
      </div>
    </div>
  );
}

export default App;
