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
var RegisterComponent = (function () {
    function RegisterComponent(route, router, http) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.registerUrl = "http://87.195.159.225:8081/apiV1/adduser";
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function (username, password) {
        var _this = this;
        console.log("trying to regiser:");
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.registerUrl, body, options).subscribe(function (data) { return _this.registerResponse(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Register request complete"); });
    };
    RegisterComponent.prototype.registerResponse = function (res) {
        console.info(res['_body']);
        this.router.navigate(['login']);
    };
    RegisterComponent.prototype.handleError = function (error) {
        console.info(error.toString());
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map