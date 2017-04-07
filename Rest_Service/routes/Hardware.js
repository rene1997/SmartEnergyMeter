/**
 * Created by rene on 4/5/17.
 */

var moment = require('moment');
var userfile = require('./User');
var mongoose = require('mongoose');
var mongoDatabase = "mongodb://localhost/SmartMeter";

var HardwareDevices     = "HardwareDevices";
var LiveMeasurements    = "LiveMeasurements";
var HistoryMeasurement  = "HistoryMeasurement";


var HardwareDevicesSchema = new mongoose.Schema({
    hardwareId : Number,
    hardwareName : String
});

var LiveMeasurementsSchema = new mongoose.Schema({
    hardwareId  : Number,
    Time        : {type: Date, default : Date.now},
    kwh         : Number
});

var HistoryMeasurementSchema = new mongoose.Schema({
    hardwareId  : Number,
    usedPower   : Number,
    Time        : {type: Date, default: Date.now}
});

function connectToDatabase(tablename, tableSchema, callback){
    var table = mongoose.model(tablename, tableSchema);
    if(mongoose.connection.readyState == 1) return callback(table);

    mongoose.connect(mongoDatabase);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){callback(table)});
}

function SyncMeasurements(hardwareDevices) {
    connectToDatabase(LiveMeasurements, LiveMeasurementsSchema, function (table) {
        for(var i = 0; i < hardwareDevices.length; i ++){
            var deviceId = hardwareDevices[i].hardwareId;
            table.find({hardwareId: deviceId}, function (err, data) {
                if(err) console.log(err);
                else addLiveDataToHistory(data);
            });
        }
    });
}

function addLiveDataToHistory(liveData){
    var hardwareId = liveData[0].hardwareId;
    var totalKwh = 0;
    var date = moment().add(2,'hours');
    date = date.add(-1, 'hours');

    for(var i = 0; i < liveData.length; i ++){
        if(liveData[i].kwh || liveData[i].kwh != null)
            totalKwh += liveData[i].kwh;
    }
    console.log("device: " + hardwareId);
    console.log("total kwh: " + totalKwh);
    console.log("date: " + date.format());
    connectToDatabase(HistoryMeasurement, HistoryMeasurementSchema, function (table) {
        var newMeasurement = new table({hardwareId: hardwareId, usedPower: totalKwh, Time: date.format()});
        newMeasurement.save(function(err){
            if(err) {
                console.log(err);
            }else{
                console.log("added: " + newMeasurement);
            }
        });
    });
}

module.exports = {
    AddMeasurement : function(req, res){
        //read body data
        var hardwareId = req.body.hardwareId;
        var kWh = req.body.kwh;

        //check body data
        if(!kWh || !hardwareId){
            res.json({status:"wrong body"});
            return console.log("wrong parameters");
        }

        var date = new Date();
        var currentTime = date + (date.getTimezoneOffset() *60 *1000);

        connectToDatabase(LiveMeasurements, LiveMeasurementsSchema, function(table){
            var newMeasurement = new table({hardwareId: hardwareId, Time: currentTime, kwh: kWh});
            newMeasurement.save(function(err){
                if(err) {
                    console.log(err);
                    res.json({status: err});
                }else{
                    console.log("added: " + newMeasurement);
                    res.json({status: "success"});
                }
            });
        });
    },

    RegisterDevice : function(req, res){
        var deviceName = req.body.devicename;
        var defaultUser = req.body.userid;
        if(!deviceName || !defaultUser ) return;

        connectToDatabase(HardwareDevices,HardwareDevicesSchema, function(table){
            table.count({}, function(err,count){
               var newDevice = new table({hardwareId: count, hardwareName: deviceName});
               newDevice.save(function (err){
                  if(err){
                      res.status(500);
                      res.json({status:err});
                      return console.log(err);
                  }else{
                      console.log(newDevice);
                      userfile.RegisterDeviceToUser(defaultUser, count, res);
                  }
               });
            });
        });
    },

    GetCurrentMeasurement : function(req,res){
       var hardwareId = req.body.hardwareId;
       connectToDatabase(LiveMeasurements, LiveMeasurementsSchema, function(table){
           table.findOne({hardwareId : hardwareId},{},{sort:{Time:-1}},function (err, data) {
               if(err){
                   res.json(err);
                   return console.log(err);
               }
               console.log(data);
               res.json(data);
           });
       });
    },

    SyncMeasurementData : function (req, res) {
        //get all hardware id's:
        connectToDatabase(HardwareDevices,HardwareDevicesSchema, function (table) {
            table.find({}, function (err, data) {
                if(err)
                    return console.log(err);
                SyncMeasurements(data);
            });
        });
    }
}


