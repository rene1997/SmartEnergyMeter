/**
 * Created by rene on 4/5/17.
 */

var mongoose = require('mongoose');
var mongoDatabase = "mongodb://localhost/SmartMeter";

var HardwareDevices     = "HardwareDevices";
var LiveMeasurements    = "LiveMeasurements";
var HistoryMeasurement  = "HistoryMeasurement";


var HardwareDevicesSchema = new mongoose.Schema({
    hardwareId : Number
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

module.exports = {
   AddMeasurement : function(req, res){
        //read body data
        var hardwareId = req.body.hardwareId;
        var kWh = req.body.kwh;

        //check body data
        if(!kWh || !hardwareId){
            console.log("wrong parameters!")
            res.json({status:"error!!!!!!!"});
            return;
        }

        var date = new Date();
        var currentTime = date + (date.getTimezoneOffset() *60 *1000);

        connectToDatabase(LiveMeasurements, LiveMeasurementsSchema, function(table){
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
        //todo
    }
}
