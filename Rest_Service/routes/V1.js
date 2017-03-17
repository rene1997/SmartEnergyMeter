 /**
* Created by renek on 9-3-2017.
*/
var express = require('express');
var router = express.Router();
var path = require('path');
var database = require('./DatabaseConnection');

 //call this function with post message with this body
 //{username: 'user', password: 'password'}
 //return value is userdata in json
router.post('/login', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var userId;
    console.log("user: " + username + " tries to login with: \npassword: " + password);
    database.getUserId(username,password,function (id) {
        res.json(id);
    });
});

 //call this funtion with post message with this body
 //{serverkey: 'key', username: 'user', password: 'password'}
 //return value is {userId: number}
router.post('/adduser', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    database.addUser(username, password, function(userdata){
        res.json(userdata);
    });
});

router.post('/addtodo', function(req,res){
   var userId = req.body.userId;
   var todoString = req.body.todo;
   database.addTodo(userId, todoString, function(todoData){
       console.log("got:");
       console.log(todoData);
       res.json(todoData);
   })
});


router.post('/completetodo', function(req,res){
    var userId = req.body.userId;
    var todoId = req.body.todoId;
    var isCompleted = req.body.isCompleted;
    database.completeTodo(userId,todoId,isCompleted,function (data){
       res.json(data);
    });
});

router.post('/gettodos', function(req,res){
   var userId = req.body.userId;
   database.getTodos(userId,function(data){
      res.json(data);
   });
});

 //all unknown calls:
router.get('*', function(req,res){
    res.json({
        "description": "unknown call"
    });
});

module.exports = router;
