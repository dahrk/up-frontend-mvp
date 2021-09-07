const express = require("express");
//const expressSession = require("express-session");
require("dotenv").config();

//server initialization
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);*/

app.use("/auth", require("./auth/passportRouter.js"));
app.use("/api/calendar", require("./routes/calendar.js"));
app.use("/api/notion", require("./routes/notion.js"));

app.get("/api/ping", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
