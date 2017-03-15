/**
 * Created by rkeet on 2/8/2017.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var mysql = require('mysql');

function getClient(){
    var c = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'5af43de3',
        database:'metingen'
    });
    c.connect();
    return c;
}

router.get('/getData', function(req,res){
    res.status(200);

    res.json({"description":"data"});
});

router.post('/sendData', function(req, res){
	console.log(req.body);
	res.status(200);
	res.json({"status": "success"});
});	

router.post('/addData', function(req,res){
    var value = req.body.sensorValue;
    var time = moment(new Date()).format('MMMM Do YYYY, h:mm a');
    console.log("got data: " + value);
    var c = getClient();
    c.query(`SELECT COUNT(*) FROM metingen;`, function(err,rows){
        var id = rows[0]['COUNT(*)'];
        console.log('id: '+ id);
        c.end();
        c = getClient();
        c.query(`INSERT INTO metingen VALUES(${id}, '${time}', 'data', ${value});`,null,function(err,rows){
            if(err){
                console.log(err);
                res.status(500);
                res.json({"status":err})
            }else{
                res.status(200);
                res.json({"status":"added data"})
            }
            c.end();
        });
    });
         
});


//all unknown calls:
router.get('*', function(req,res){
    res.json({
        "description": "unknown call"
    });
});

module.exports = router;

