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
var MeterkastMenuComponent = (function () {
    function MeterkastMenuComponent(route, router, http) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.liveMeasurementUrl = "http://keijzersoft.nl:8081/apiV1/getCurrentSpeed";
        this.lineChartData = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartType = 'line';
        this.pieChartType = 'pie';
        // Pie
        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        this.pieChartData = [300, 500, 100];
    }
    MeterkastMenuComponent.prototype.ngOnInit = function () {
        var data = document.getElementById("hardwareData");
        if (!data)
            return this.router.navigate(['login']);
        console.log(data.innerHTML);
        this.refreshPowerUsage(data.innerHTML);
    };
    MeterkastMenuComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    };
    MeterkastMenuComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    MeterkastMenuComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    MeterkastMenuComponent.prototype.refreshPowerUsage = function (hardwareData) {
        var hardwareId = JSON.parse(hardwareData).hardwareId;
        this.getLiveMeasurements(hardwareId);
        var self = this;
        setInterval(function () {
            self.getLiveMeasurements(hardwareId);
        }, 10000);
    };
    MeterkastMenuComponent.prototype.getLiveMeasurements = function (hardwareId) {
        var _this = this;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('hardwareId', '' + hardwareId);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.liveMeasurementUrl, body, options).subscribe(function (data) { return _this.setLiveMeasurement(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Hardware request complete"); });
    };
    MeterkastMenuComponent.prototype.setLiveMeasurement = function (data) {
        var obJson = JSON.parse(data['_body']);
        console.log(obJson);
        var speed = document.getElementById("currentSpeed");
        var speedNumber = "" + obJson.wh;
        speed.innerHTML = speedNumber.split('.')[0];
    };
    MeterkastMenuComponent.prototype.handleError = function (error) {
        console.info(error.toString());
    };
    MeterkastMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'meterkastMenu',
            templateUrl: './meterkastMenu.component.html',
            styleUrls: ['./meterkastMenu.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
    ], MeterkastMenuComponent);
    return MeterkastMenuComponent;
}());
exports.MeterkastMenuComponent = MeterkastMenuComponent;
//# sourceMappingURL=meterkastMenu.component.js.map