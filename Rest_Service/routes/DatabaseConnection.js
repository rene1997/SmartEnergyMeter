/**
 * Created by renek on 9-3-2017.
 */
var mongoose = require('mongoose');
var mongoDatabase = "mongodb://localhost/SmartMeter";

var Users               = "User"
var UserRights          = "UserRights";
var HardwareDevices     = "HardwareDevices";
var LiveMeasurements    = "LiveMeasurements";
var HistoryMeasurement  = "HistoryMeasurement";

var UserSchema = new mongoose.Schema({
    userId: Number,
    userName: String,
    password: String,
});

var UserRightsSchema = new mongoose.Schema({
    hardwareId  : Number,
    userId      : Number
});

var HardwareDevicesSchema = new mongoose.Schema({
    hardwareId   : Number,
    hardwareName : String
});

var LiveMeasurementsSchema = new mongoose.Schema({
    hardwareId  : Number,
    time        : {type: Date, default : Date.now},
    kwh         : Number
});

var HistoryMeasurementSchema = new mongoose.Schema({
    hardwareId  : Number,
    usedPower   : Number,
    time        : {type: Date, default: Date.now}
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
    Users                   : Users,
    UserRights              : UserRights,
    HardwareDevices         : HardwareDevices,
    LiveMeasurements        : LiveMeasurements,
    HistoryMeasurement      : HistoryMeasurement,

    UserSchema              : UserSchema,
    UserRightsSchema        : UserRightsSchema,
    HardwareDevicesSchema   : HardwareDevicesSchema,
    LiveMeasurementsSchema  : LiveMeasurementsSchema,
    HistoryMeasurementSchema: HistoryMeasurementSchema,

    connectToDatabase       : connectToDatabase
}
