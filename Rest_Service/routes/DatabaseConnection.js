/**
 * Created by renek on 9-3-2017.
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: Number,
    userName: String,
    password: String,
});

var ToDoSchema = new mongoose.Schema({
    userId: Number,
    completed: {type : Boolean, default: false},
    note: String,
    todoId: Number,
    updated_at: { type: Date, default: Date.now },
});

//connect to user database
function connectUser(callback){
    var User = mongoose.model('User', UserSchema);
    if(mongoose.connection.readyState == 1)     return callback(User);

    mongoose.connect('mongodb://localhost/AngularOpdracht');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){callback(User)});
}

function connectTodo(callback){
    var ToDo = mongoose.model('ToDo', ToDoSchema);
    if(mongoose.connection.readyState == 1)     return callback(ToDo);

    mongoose.connect('mongodb://localhost/AngularOpdracht');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){callback(ToDo)});
}

module.exports = {
    getUserId : function(username, password, callback){
        connectUser(function(user){
            user.find({userName:username, password:password},function(err, data){
                if(err) return console.error(err);
                if(data.length > 0){
                    callback(data[0]);
                }else{
                    callback({status:"unauthorized"});
                }
            });
        });
    },

    addUser : function(username, password, callback){
        connectUser(function(user){
           user.count({}, function(err, count){
                var newUser = new user({userId:count, userName:username, password:password});
                newUser.save(function (err) {
                    if(err) console.log(err);
                    else console.log(newUser);
                    callback(newUser);
                });
           });
        });
    },

    addTodo : function(userId, todoString, callback) {
        connectTodo(function(todo){
                todo.count({}, function(err, count){
                    var newTodo = new todo({userId:userId, note:todoString, todoId:count});
                    newTodo.save(function(err){
                        if(err) callback({"status":err});
                        else callback(newTodo);
                    })
                });
            });
    },

    completeTodo : function(userId, todoId, isCompleted, callback){
        connectTodo(function (todo) {
            todo.update ({userId:userId, todoId: todoId}, {$set:{completed:isCompleted}},function(err, data){
                if(err) callback({status: err});
                else callback(data);
            });
        });
    },

    getTodos : function (userId, callback) {
        connectTodo(function (todo) {
            todo.find({userId: userId}, function(err, data){
                if(err) callback({status:err});
                else callback(data);
            });
        });
    }
}

