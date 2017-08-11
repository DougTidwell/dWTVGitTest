const cfenv = require('cfenv');

// The default port number MUST be whatever the Cloud Foundry environment
// has defined in the PORT variable. Otherwise your app will fail to deploy
// to Bluemix with a mysterious health check error.
const port = process.env.PORT || 6006;
const dbname = 'webinar';

// Get service credentials from the VCAP_SERVICES environment
// variable.
var vcapServices = JSON.parse(process.env.VCAP_SERVICES);

// We use the Cloudant NoSQL database
var Cloudant = require('cloudant');
var cloudant, cloudantDB;

// The Cloudant URL contains the username and password
const url = vcapServices.cloudantNoSQLDB[0].credentials.url;

// Now open the database. If it doesn't exist, it is created.
cloudant = Cloudant(url);
cloudant.db.create(dbname);
cloudantDB = cloudant.use(dbname);

if (cloudantDB === null)
    console.warn('Could not find or create the database!');
else
    console.log('The database seems to be fine.');

// Use the common combination of Express, body-parser, and
// request to handle web traffic and requests.
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Create a new express server and set up the body-parser
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML files out of ./public
app.use(express.static(__dirname + '/public'));

// Handle POST requests sent to the /registration URL. Note
// that the /public directory doesn't have anything that
// matches that name. /registration is the value of the
// action attribute on the <form> element in index.html.
app.post('/registration', function(req, res){
  // body-parser delivers the body of the request as a JSON
  // document (req.body), so just pass that on to Cloudant.
  cloudantDB.insert(req.body, function(err, body, header) {
    if (err) {
        console.log('insert failed! ' + err.message);
        res.status(500).send(err.message);
    } else {
        console.log('Registration successfully processed!');
    }
  });
  // Now redirect the user to the success page
  res.redirect("/registered.html");
});

// start server on the specified port
app.listen(port);
console.log(`Using node.js version ${process.version}`);
console.log(`Server started on port ${port} ...`);
