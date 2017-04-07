/**
 * Created by rene on 4/5/17.
 */

var database = require('./DatabaseConnection');
var hardware = require('./Hardware');

var mongoose = require('mongoose');

function addUser(username, password, callback) {
    database.connectToDatabase(database.Users, database.UserSchema, function(user) {
        user.count({}, function (err, count) {
            var newUser = new user({userId: count, userName: username, password: password});
            newUser.save(function (err) {
                if (err) console.log(err);
                else console.log(newUser);
                callback(newUser);
            });
        });
    });
}

function getUserId(username, password, callback) {
    database.connectToDatabase(database.Users, database.UserSchema,function(user) {
        user.find({userName: username, password: password}, function (err, data) {
            if (err) return console.error(err);
            if (data.length > 0) {
                callback(200, data[0]);
            } else {
                callback(401, {status: "no permission!"});
            }
        });
    });
}


module.exports = {
    UserLogin : function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var userId;
        console.log("user: " + username + " tries to login with: \npassword: " + password);
        getUserId(username,password,function (status,id) {
            res.status(status)
            res.json(id);
        });
    },

    AddUser : function (req, res){
        var username = req.body.username;
        var password = req.body.password;
        var licence = req.body.licence;
        var correctLicence = require("./../config.json").licence;
        if(licence !== correctLicence){
            console.log("wrong licence");
            res.status(401);
            res.json({status:"no permission!"});
            return;
        }
        addUser(username, password, function(userdata){
            res.json(userdata);
        });
    },

    RegisterDeviceToUser : function(userId, hardwareId, res){
        database.connectToDatabase(database.UserRights, database.UserRightsSchema, function(table){
            var newUserRight = new table({userId : userId, hardwareId : hardwareId});
            newUserRight.save(function(err){
               res.json({status:"success", hardwareId : hardwareId});
               console.log("registered new device with user");
            });
        });
    },

    GetAvailableDevices : function(req,res){
        var userId = req.body.userId;
        if(!userId) return res.status(401);

        database.connectToDatabase(database.UserRights, databse.UserRightsSchema , function (table){
            table.find({userId : userId}, function (err,data) {
               if(err){
                   res.status(500); res.body({error:err});
                   return console.log(err)
               }
               hardware.ReturnHardwareNames(data, res);
            });
        });
    }
}
