var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET the Form. */
router.get('/form', function(req, res) {
  res.render('form', { title: 'Meter Reading Form' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/*GET meter readings page*/

router.get('/newmeterreading', function(req,res) {
  res.render('newmeterreading', { title:'Add new meter reading'});
});


/*POST Meter reading*/
router.post('/readmeters', function(req, res) {

// Set our internal DB variable
  var db = req.db;

  console.log("AccNo:", req.body.accountNumber);

  // Get our form values. These rely on the "name" attributes
  var accNo = req.body.accountNumber;
  var bpNo = req.body.BPNumber;
  var rDate = req.body.readingDate;
  var portionNo= req.body.portionNo;
  var waterMeter= req.body.waterMeter;
  var electMeter= req.body.electMeter;
  var waterResource =req.body.waterResource;
  var electResource = req.body.electResource;
  var jsonData ={

  };

  // var portion = req.body.portion;
  // var readingDate  =req.body.readingDate;
  // var waterMeter =req.body.waterMeter;
  // var electricityMeter  = req.body.electricityMeter;
  // var waterMeterReadingResource  =req.body.waterMeterReadingResource;
  // var electricityMeterReadingResource = req.body.electricityMeterReadingResource;
  // // set colleciton to write the date to
  var collection = db.get('meterreadings');


  //submit data to database
  // binding
  collection.insert({
    "accountNumber" : accNo,
    "BPNo" : bpNo,
    "readingDate" : rDate,
    "portionNo" : portionNo,
    "electMeter" : electMeter,
    "waterMeter" : waterMeter,
    "electResource": electResource,
    "waterResource": waterResource
    // "bp" : bp,
    // "portion" : portion,
    // "readingdate" : readingDate,
    // "waterMeter" : waterMeter,
    // "electricityMeter" : electricityMeter,
    // "waterMeterReadingResource" : waterMeterReadingResource,
    // "electricityMeterReadingResource" : electricityMeterReadingResource

  }, function (err, doc) {
      if(err){
        res.send("failed to save meter reading");
      }
      else {
          //if successful route to the captured meter reading
          res.location("/");
          res.redirect("/");
        }
      });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DBaccountNumber
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


module.exports = router;
