var express = require("express");

var app = express();

app.use('/', function(req, res, next){
  console.log("Give use()");
  next();
});

app.get('/', function(req, res, next){
  res.send("Hello World");
  next();
});

app.use('/', function(req, res, next){
  console.log("Third");
  next();
});

app.get('/', function(req, res){
  console.log("Fourth");
});

app.listen(3000);
