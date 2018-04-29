var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var mongoose = require('mongoose');

var upload = multer();
var app = express();
app.set('view engine', 'pug');
app.set('views', './public');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

mongoose.connect('mongodb://localhost:27017/expressDB'); /*(error) => {
  if (error) {
    console.error("error connecting");
    throw error;
  }*/

  // console.log('connected successfully')
// });

var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

var Person = mongoose.model("Person", personSchema);

app.get("/", function(req, res){
  console.log("Get recieved");
  res.render('person');
});

app.post("/", function(req, res){
   var personInfo = req.body; //Get the parsed information
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
      newPerson.save(function(err, Person){
         console.log(Person);
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

app.post("/public", function(req, res){
  //Delete part
  
  // Person.remove({age: 33}, function(err, response){
  //   console.log(response);
  // });
  //Update part
  // app.put('/public/:id', function(req, res){
  //   Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
  //     if(err) res.json({message: "Error in updating person with id " + req.params.id});
  //     res.json(response);
  //   })
  // });

  //Find part
  var Sname = req.body.name;
  if(!Sname){
    res.render('search_result', {
      message: "Please input search name!", type: "error"});
  }
  else{
    Person.findByIdAndUpdate("5ae5db2ac6739a6f9cb57450", {age: 22}, function(err, response){
      res.json(response);
      console.log(response);
      if(err){
        res.render('search_result', {message: "No data!", type: "error"});
      }
      else {
        res.render('search_result', {message: "Find person data", type: "success", person: });
      }
    });
  }
});

app.listen(8080);
// app.get("/", function(req, res){
//   res.render('form');
// });
//

// app.use(express.static('public'));
//
// app.post('/', function(req, res){
//   console.log(req.body);
//   res.send("recieved your request!");
// });
