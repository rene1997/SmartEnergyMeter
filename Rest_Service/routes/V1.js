 /**
* Created by re'nek on 9-3-2017.
*/
var express = require('express');
var router = express.Router();
var path = require('path');

var userFile = require("./User");
var hardwareFile = require("./Hardware");

router.post("/login", userFile.UserLogin);
router.post("/addUser", userFile.AddUser);
router.post("/register", userFile.AddUser);
router.post("/getDevices", userFile.GetAvailableDevices);

router.post("/registerDevice", hardwareFile.RegisterDevice);
router.post("/addMeasurement", hardwareFile.AddMeasurement);
router.post("/getLastMeasurement", hardwareFile.GetCurrentMeasurement);

router.post("*", function(req,res){
   res.json({desription: "unknown call"}) ;
});

 //all unknown calls:
router.get('*', function(req,res){
    res.json({
        "description": "unknown call"
    });
});

module.exports = router;
