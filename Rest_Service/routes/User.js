/**
 * Created by rene on 4/5/17.
 */

var database = require('./DatabaseConnection');

var mongoose = require('mongoose');
var mongoDatabase = "mongodb://localhost/SmartMeter";

var UserRights = 'UserRights';
var UserRightsSchema = new mongoose.Schema({
    HardwareId  : Number,
    UserId      : Number
});

function connectToDatabase(tablename, tableSchema, callback){
    var table = mongoose.model(tablename, tableSchema);
    if(mongoose.connection.readyState == 1) return callback(table);
    mongoose.connect(mongoDatabase);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){callback(table)});
}

module.exports = {
    UserLogin : function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var userId;
        console.log("user: " + username + " tries to login with: \npassword: " + password);
        database.getUserId(username,password,function (status,id) {
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
        database.addUser(username, password, function(userdata){
        });
    },

    RegisterDeviceToUser : function(userId, hardwareId, res){
        connectToDatabase(UserRights, UserRightsSchema, function(table){
            var newUserRight = new table({UserId : userId, HardwareId : hardwareId});
            newUserRight.save(function(err){
               res.json({status:"success", hardwareId : hardwareId});
               console.log("registered new device with user");
            });
        });
    }
}
