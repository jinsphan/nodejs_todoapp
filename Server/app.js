var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();
var apiRoute = require("./Route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Show on console detail requests
app.use(logger("dev"));

app.use("/api", apiRoute);

// Handle Error
app.use((req, res, next) => {
  res.status(404);
  res.end("The API link wrong!!!");
})
// Handle Error UnauthorizedError
app.use((err, req, res, next) => {
  if(err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token...");
  }
})

app.set("port", process.env.PORT || 3001);
var server = app.listen(app.get("port"), () => {
  console.log("App Listening on Port: " + server.address().port);
})