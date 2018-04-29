var express = require('express');
var cookiePareser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookiePareser());
app.use(session({secret: "Shh, its a secret!"}));

app.get("/", function(req, res){
  if(req.session.page_views && req.session.name){
    req.session.name = "After first";
    console.log(req.session);
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    req.session.name = "first";
    res.send("Welcome to this page for the first time!");
  }
});

app.listen(3000);
