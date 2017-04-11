/**
 * Created by rene on 4/5/17.
 */

var moment = require('moment');
var userfile = require('./User');
var database = require('./DatabaseConnection');

function SyncMeasurements(hardwareDevices) {
    database.connectToDatabase(database.LiveMeasurements, database.LiveMeasurementsSchema, function (table) {
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
    console.log(liveData);
    if(!liveData[0]) return;
    var hardwareId = liveData[0].hardwareId;
    var totalKwh = liveData.length / liveData[0].kwh ;
    var startHour = moment().add(1,"hour").format(); // -1 past hour +2 for local time

    console.log("device: " + hardwareId);
    console.log("total kwh: " + totalKwh);
    console.log("date: " + startHour);
    database.connectToDatabase(database.HistoryMeasurement, database.HistoryMeasurementSchema, function (table) {
        var newMeasurement = new table({hardwareId: hardwareId, usedPower: totalKwh, time: startHour});
        newMeasurement.save(function(err){
            if(err) {
                console.log(err);
            }else{
                console.log("added: " + newMeasurement);
                removeLiveData(hardwareId);
            }
        });
    });
}

function removeLiveData(hardwareId){
    database.connectToDatabase(database.LiveMeasurements, database.LiveMeasurementsSchema, function (table) {
        table.remove({hardwareId : hardwareId},function(){
            console.log("removed live data");
        });

    })
}

function calculateDataSpeed(data, callback){
    if(data.length < 2) return callback("not enough data");
    var date1 = data[0].time;
    var date2 = data[1].time;
    var rotationValue = data[0].kwh;
    var diffMilliseconds = moment.utc(moment(date1)).diff(moment(date2));
    var usageWH = (3600000 / diffMilliseconds) / rotationValue * 1000;
    var returnData =
        {
            time        : data[0].time,
            hardwareId  : data[0].hardwareId,
            kw          : data[0].kwh,
            wh          : usageWH
        };
    callback(returnData);
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

        var date = moment().format();

        database.connectToDatabase(database.LiveMeasurements, database.LiveMeasurementsSchema, function(table){
            var newMeasurement = new table({hardwareId: hardwareId, Time: date, kwh: kWh});
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
        var deviceName = req.body.deviceName;
        var defaultUser = req.body.userId;
        if(!deviceName  || !defaultUser ) return console.log("error with parameters");

        database.connectToDatabase(database.HardwareDevices,database.HardwareDevicesSchema, function(table){
            table.count({}, function(err,count){
               var newDevice = new table({hardwareId: count, hardwareName: deviceName});
               newDevice.save(function (err){
                  if(err){
                      res.status(500);
                      res.json({status:err});
                      return console.log(err);
                  }
                  console.log(newDevice);
                   database.connectToDatabase(database.UserRights, database.UserRightsSchema, function(table){
                       var newUserRight = new table({userId : defaultUser, hardwareId : count});
                       newUserRight.save(function(err){
                           if(err) return res.json(err);
                           res.json({status:"success", hardwareId : count});
                           console.log("registered new device with user");
                       });
                   });
               });
            });
        });
    },

    GetCurrentMeasurement : function(req,res){
       var hardwareId = req.body.hardwareId;
        database.connectToDatabase(database.LiveMeasurements, database.LiveMeasurementsSchema, function(table){
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
        database.connectToDatabase(database.HardwareDevices,database.HardwareDevicesSchema, function (table) {
            table.find({}, function (err, data) {
                if(err)
                    return console.log(err);
                SyncMeasurements(data);
            });
        });
    },

    ReturnHardwareNames : function (userRightData, res){
        console.log(userRightData);
        database.connectToDatabase(database.HardwareDevices,database.HardwareDevicesSchema, function (table) {
            var responseData = [];
            table.find({}, function (err, hardwareData){
                if(err){
                    res.status(500);
                    return console.log(err);
                }
                for(var i = 0; i < userRightData.length; i ++){
                    for(var j = 0; j < hardwareData.length; j++){
                        if(hardwareData[j].hardwareId == userRightData[i].hardwareId){
                            responseData.push(hardwareData[j]);
                        }
                    }
                }
                res.json(responseData);
            });
        })
    },

    GetHistory : function (req,res){
        var hardwareId = req.body.hardwareId;
        database.connectToDatabase(database.HistoryMeasurement, database.HistoryMeasurementSchema, function (table) {
           table.find({hardwareId : hardwareId})
               .limit(25)
               .sort({time:'1'})
               .exec(function (err, data) {
                    if(err){
                        console.log(err); res.status(500);
                        return res.json(err);
                    }
                    res.json(data.reverse());
           });
        });
    },
    
    GetCurrentSpeed : function (req,res) {
        var hardwareId = req.body.hardwareId;
        database.connectToDatabase(database.LiveMeasurements, database.LiveMeasurementsSchema, function (table){
            table.find({hardwareId : hardwareId}).
            limit(2).sort({time:'-1'}).exec(function (err, data) {
                if(err){
                    console.log("error while getting current speed: ");
                    return res.json(err);
                }
                console.log(data)
                calculateDataSpeed(data,function (data) {
                    res.json(data);
                })
            });
        });
    }
}


