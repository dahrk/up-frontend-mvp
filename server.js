const express = require("express");
const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
