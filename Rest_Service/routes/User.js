/**
 * Created by rene on 4/5/17.
 */

var database = require('./DatabaseConnection');

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
            res.json(userdata);
        });
    }
}
