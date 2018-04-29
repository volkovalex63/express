var cookieParser = require("cookie-parser");
var express= require("express");
var app = express();
app.use(cookieParser());

app.get("/", function(req, res){
  res.cookie('name', 'express').send('cookie set');// Sets name = express
  // res.cookie('name', 'express', {expire: 3600 + Date.now()});
  console.log('Cookies: ', req.cookies);
});

app.get('/clear_cookie_foo', function(req, res){
  res.clearCookie('name');
  res.send('cookie foo cleared');
});

app.listen(3000);
