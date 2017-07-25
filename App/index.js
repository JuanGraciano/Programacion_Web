var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var helpers = require('./lib/helpers'), 
    bodyParser = require('body-parser'),
    // cors = require('cors'),
    router = express.Router(),
    config = require('./config'),
    mongoose = require('mongoose');

app.use(router);

app.use('/static', express.static('public'));

app.engine('handlebars', 
      exphbs({defaultLayout: 'main', 
      helpers:helpers,
      layoutsDir: 'views/layouts/',
      partialsDir: 'views/partials/'
      })
);


app.set('superSecret', config.secret); // secret variable

// app.use(cors());
// set up our express application
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.set('view engine', 'handlebars');


// routes ======================================================================
require('./routes/routes.js')(app);


app.get('/viewPizza', function (req, res) {
    res.render('pizza');
  });

app.get('/perreo', function (req, res) {
    res.render('tree');
  });

app.get('/', function (req, res) {
  	 res.render('home');
  });

app.get('/about', function (req, res) {
  	res.render('about');
  });

// app.post('/newUser', function (req, res) {
//     console.log(req.body);
//     res.send(200);
//     res.render('signIn');
//   });

// launch ======================================================================
//Conect to database
mongoose.connect(config.database, function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else
        console.log("Connected to the db");

    //Create the server and listen in the port 3000
    app.listen(config.port, function() {
        console.log('Node server running on port ', config.port);
    });
});
