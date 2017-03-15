var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var settings = require('./config.json');
var version1 = require('./routes/V1');
var app = express();

// Read all app settings
app.set('secretkey', settings.secretkey);
app.set('username', settings.username);
app.set('password', settings.password);
app.set('webPort', settings.webPort);

app.all('*', function(req,res, next){
    console.log("got request:");
    console.log(req.method + " " + req.url);
    next();
});

app.use(bodyParser.urlencoded());
app.use('/apiV1', version1);

// Start server
var port = 8081;
var server = app.listen( port , function() {
    console.log('Listening server on port ' + server.address().port );
});

