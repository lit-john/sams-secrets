var express = require('express');
var router = express.Router();
var fs = require("fs");

var mongoose = require('mongoose');
var User = require('../models/user');
var connectionString = CUSTOMCONNSTR_mongoLab || "mongodb://localhost/test";
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Hello");
});

User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});

var obj = [];
var signedIn = false;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secrets Application' });
});

router.get('/hello', function(req, res, next) {
  res.render('hello', {name: req.query.yourName, age: req.query.yourAge});
});

router.get('/sign-in', function(req, res, next) {
  res.render('sign-in');
});

router.get('/sign-up', function(req, res, next) {
  res.render('sign-up');
});


router.post('/sign-up', function(req, res, next) {

      var newUser = User({
          username: req.body.postUsername,
          password: req.body.postPassword,
      });

      newUser.save(function(err) {
        if (err) throw err;

        console.log('User created!');
      });

      res.render('hello', {yourUsername: req.body.postUsername});

});
/*
going to change the way we store the data to mongoDb

if(signedIn == false){
  router.post('/sign-in', function(req, res, next) {
    fs.readFile("storeObjs.json", function (error, data){

      if (error) throw error;

      obj = JSON.parse(data);

      for(var i = 0; i < obj.length; i++){
        if (req.body.checkPassword == obj[i].password) {
          console.log(req.body.checkName + " signed in!");
          res.render('hello');
          signedIn = true;
        }
      }
    });
  });
}
else {
  res.render('hello');
}

//Called when someone presses the sign-up button.
router.post('/sign-up', function(req, res, next) {

    //Learned my lesson here with the difference between async and sync
    //The readFile, obj.push and writeFile were on the same line.
    //Obj.push and writeFile were being called before the readFile was,
    //Causing it to write over the data that was previously there.


    //Reading our file and storing it in a local variable
    //This is to get the data or users thats currently in the JSON file
    fs.readFile("storeObjs.json", function (error, data){
      if (error) throw error;

      obj = JSON.parse(data);
      console.log(obj.length);

      //The obj is an array, so we can push another object into there
      //This object gets its name + pwd from the sign-up page
      obj.push({
                  "username":req.body.postUsername,
                  "password":req.body.postPassword
              });


      //rewrite the file with the new object added to the old
      //now that i have an array, i can check it on the sign in page.
      fs.writeFile('storeObjs.json', JSON.stringify(obj), (err) => {
        if (err) throw err;

        console.log('Success!! Person added!!');
      });
      //For now, just say hello, we know its working then!
      res.render('hello', {yourUsername: req.body.postUsername});
    });



});
*/
module.exports = router;
