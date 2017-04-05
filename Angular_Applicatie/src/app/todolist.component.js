"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var ToDo = (function () {
    function ToDo() {
    }
    return ToDo;
}());
exports.ToDo = ToDo;
var TodoListComponent = (function () {
    function TodoListComponent(route, router, http) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.gettodoUrls = "http://keijzersoft.nl:8081/apiV1/gettodos";
        this.addTodoUrl = "http://keijzersoft.nl:8081/apiV1/addtodo";
    }
    TodoListComponent.prototype.ngOnInit = function () {
        this.getToDos();
    };
    TodoListComponent.prototype.getToDos = function () {
        var _this = this;
        console.log("trying to retrieve todos from server..");
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('userId', '0');
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.gettodoUrls, body, options).subscribe(function (data) { return _this.handleToDos(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Register request complete"); });
    };
    TodoListComponent.prototype.handleToDos = function (data) {
        console.log(data['_body']);
        var objs = JSON.parse(data['_body']);
        console.log(objs);
        this.todos = objs;
    };
    TodoListComponent.prototype.handleError = function (error) {
        console.info(error.toString());
    };
    TodoListComponent.prototype.addTodo = function (note) {
        var _this = this;
        console.log(note);
        console.log("trying to add todo to sserver..");
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('userId', '0');
        urlSearchParams.append('todo', note);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.addTodoUrl, body, options).subscribe(function (data) { return _this.handleAddedTodo(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Register request complete"); });
    };
    TodoListComponent.prototype.handleAddedTodo = function (data) {
        console.log(data);
        this.getToDos();
    };
    TodoListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todolist',
            templateUrl: './todolist.component.html',
            styleUrls: ['./todolist.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
    ], TodoListComponent);
    return TodoListComponent;
}());
exports.TodoListComponent = TodoListComponent;
//# sourceMappingURL=todolist.component.js.map