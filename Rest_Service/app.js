var express = require('express');
var path = require('path');
var scheduler = require('node-schedule')
var bodyParser = require('body-parser');
var settings = require('./config.json');
var version1 = require('./routes/V1');
var hardware = require('./routes/Hardware');

var moment = require('moment');

var app = express();
app.use(bodyParser.urlencoded());

app.all('*', function(req,res,next){
    console.log("got request:");
    console.log(req.method + " " + req.url);

    //check authentication:
    var key =  req.body.serverKey;
    if(key !== settings.serverKey){
        console.log("wrong serverkey!");
        res.status(401);
        res.json({status:"no permission!"});
        return;
    }
    //set headers for communicating with angular application
    //Access-Control-Allow-Headers: Content-Type
    //Access-Control-Allow-Methods: GET, POST, OPTIONS
    //Access-Control-Allow-Origin: *
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/apiV1', version1);


//start server
var server = app.listen( settings.webPort , function() {
    console.log("Server started at:" + moment().format());
    console.log('Listening server on port ' + server.address().port );
});

//start syncing each hour add x:00
scheduler.scheduleJob('0 * * * *',function (){
    console.log("syncing measurements");
    hardware.SyncMeasurementData();
});

