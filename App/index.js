var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var helpers = require('./lib/helpers');


app.use('/static', express.static(__dirname + '/public'));

app.engine('handlebars', 
			exphbs({defaultLayout: 'main', 
			helpers:helpers,
			layoutsDir: __dirname + '/views/layouts/',
			partialsDir: __dirname +  '/views/partials/'
			})
);

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  	 res.render('home');
  });

app.get('/about', function (req, res) {
  	res.render('about');
  });

var port = 8080

app.listen(port, function () {
  console.log('App listening on port ', port);
});
