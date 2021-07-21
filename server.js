const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

const listener = app.listen(process.env.PORT|3030, () => {
  console.log( (process.env.PORT)?"Your app is listening on port " + listener.address().port:"http://127.0.0.1:3030/");
});
