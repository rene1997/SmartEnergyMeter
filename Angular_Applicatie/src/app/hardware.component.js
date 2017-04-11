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
var login_component_1 = require('./login.component');
var Hardwares = (function () {
    function Hardwares() {
    }
    return Hardwares;
}());
exports.Hardwares = Hardwares;
var HardwareComponent = (function () {
    function HardwareComponent(route, router, http) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.getHardwareUrl = "http://87.195.159.225:8081/apiV1/getDevices";
    }
    HardwareComponent.prototype.ngOnInit = function () {
        var data = document.getElementById("userData");
        if (!data)
            return this.router.navigate(['login']);
        console.log(data.innerHTML);
        this.userData = JSON.parse(data.innerHTML);
        this.getHardware();
    };
    HardwareComponent.prototype.getHardware = function () {
        var _this = this;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('userId', '' + this.userData["userId"]);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.getHardwareUrl, body, options).subscribe(function (data) { return _this.HardwareResponse(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Hardware request complete"); });
    };
    HardwareComponent.prototype.HardwareResponse = function (data) {
        console.log(data['_body']);
        var obJson = JSON.parse(data['_body']);
        console.log(obJson);
        this.hardwares = obJson;
    };
    HardwareComponent.prototype.handleError = function (error) {
        console.info(error.toString());
    };
    HardwareComponent.prototype.onSelect = function (hardware) {
        console.log(hardware);
        //remove old userdata
        while (document.getElementById("hardwareData")) {
            var element = document.getElementById("hardwareData");
            element.parentNode.removeChild(element);
        }
        var data = document.createElement("LABEL");
        data.id = "hardwareData";
        ;
        data.innerText = JSON.stringify(hardware);
        data.style.visibility = "hidden";
        document.body.appendChild(data);
        this.router.navigate(['meterkastMenu']);
    };
    __decorate([
        core_1.ViewChild(login_component_1.LoginComponent), 
        __metadata('design:type', login_component_1.LoginComponent)
    ], HardwareComponent.prototype, "loginComponent", void 0);
    HardwareComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hardware',
            templateUrl: './hardware.component.html',
            styleUrls: ['./hardware.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
    ], HardwareComponent);
    return HardwareComponent;
}());
exports.HardwareComponent = HardwareComponent;
//# sourceMappingURL=hardware.component.js.map