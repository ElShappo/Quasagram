/*
  dependencies
*/

const express = require("express");

/*
  config - express
*/

const app = express();

/*
  endpoint - posts
*/

app.get("/posts", (request, response) => {
  let posts = [
    {
      caption: "Golden Gate Bridge",
      location: "San Francisco, USA",
    },
    {
      caption: "Red Square",
      location: "London",
    },
  ];
  response.send(posts);
});

/*
  listen
*/

app.listen(3000, () => {
  console.log(`Server is listening on some port`);
});
