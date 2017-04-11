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
        this.lineChartData = [{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], label: 'power consumption past 24 hours (Watt/Hour)' }];
        this.lineChartLabels = [
            '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
        ];
        this.lineChartType = 'line';
        this.dateVisible = false;
        this.liveMeasurementUrl = "http://keijzersoft.nl:8081/apiV1/getCurrentSpeed";
        this.historyMeasurementUrl = "http://keijzersoft.nl:8081/apiV1/getHistory";
        this.dateMeasurementsUrl = "http://keijzersoft.nl:8081/apiV1/getDateMeasurements";
    }
    MeterkastMenuComponent.prototype.ngOnInit = function () {
        var data = document.getElementById("hardwareData");
        if (!data)
            return this.router.navigate(['login']);
        console.log(data.innerHTML);
        this.hardwareInfo = JSON.parse(data.innerHTML);
        var header2 = document.getElementById('header');
        header2.innerHTML = 'Status ' + this.hardwareInfo['hardwareName'];
        this.refreshPowerUsage();
        this.getHistoryData();
    };
    MeterkastMenuComponent.prototype.refreshPowerUsage = function () {
        this.getLiveMeasurements(this.hardwareInfo['hardwareId']);
        var self = this;
        setInterval(function () {
            self.getLiveMeasurements(self.hardwareInfo['hardwareId']);
        }, 10000);
    };
    MeterkastMenuComponent.prototype.getHistoryData = function () {
        var _this = this;
        var hardwareId = this.hardwareInfo['hardwareId'];
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('hardwareId', '' + hardwareId);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.historyMeasurementUrl, body, options).subscribe(function (data) { return _this.setHistoryMeasurement(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Hardware request complete"); });
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
    MeterkastMenuComponent.prototype.setHistoryMeasurement = function (data) {
        console.log("got history data");
        //set vars
        var obJson = JSON.parse(data['_body']);
        var dataIndex = 0;
        if (obJson.length > 24) {
            dataIndex = obJson.length - 24;
        }
        var _lineChartData = new Array(1);
        _lineChartData[0] = { data: new Array(this.lineChartData[0].data.length), label: "power consumption past 24 hours (Watt/Hour)" };
        for (var j = 0; j < this.lineChartData[0].data.length; j++, dataIndex++) {
            var usage = obJson[dataIndex].usedPower;
            _lineChartData[0].data[j] = usage * 1000;
            var time = obJson[dataIndex].time.split('T')[1].split('.')[0];
            this.lineChartLabels[j] = time.substring(0, time.length - 3);
        }
        this.lineChartData = _lineChartData;
    };
    MeterkastMenuComponent.prototype.setLiveMeasurement = function (data) {
        var obJson = JSON.parse(data['_body']);
        var speedLabel = document.getElementById("currentSpeed");
        console.log(obJson);
        var speedNumber = "" + obJson.wh;
        speedLabel.innerHTML = speedNumber.split('.')[0];
    };
    MeterkastMenuComponent.prototype.handleError = function (error) {
        console.info(error.toString());
    };
    MeterkastMenuComponent.prototype.setSelectedDateVisible = function () {
        this.dateVisible = !this.dateVisible;
    };
    MeterkastMenuComponent.prototype.getSelectedDate = function () {
        var _this = this;
        var date = document.getElementById("selectedDate").value;
        var hardwareId = this.hardwareInfo['hardwareId'];
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('hardwareId', '' + hardwareId);
        urlSearchParams.append('date', '' + date);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        var body = urlSearchParams.toString();
        return this.http.post(this.dateMeasurementsUrl, body, options).subscribe(function (data) { return _this.setSelectedDate(data); }, function (err) { return _this.handleError(err); }, function () { return console.log("Hardware date request complete"); });
    };
    MeterkastMenuComponent.prototype.setSelectedDate = function (data) {
        var obJson = JSON.parse(data['_body']);
        if (obJson.length <= 0)
            return;
        var label = "power usage from: ";
        label = label + obJson[0]['time'].split('T')[0] + ' (Watt/Hour)';
        console.log("got awesome date response:");
        console.log(obJson[0]['usedPower']);
        var dataIndex = 0;
        if (obJson.length > 24) {
            dataIndex = obJson.length - 24;
        }
        var _lineChartData = new Array(1);
        _lineChartData[0] = { data: new Array(this.lineChartData[0].data.length), label: label };
        for (var j = 0; j < 24; j++, dataIndex++) {
            try {
                var usage = obJson[dataIndex]['usedPower'];
                _lineChartData[0].data[j] = usage * 1000;
                var time = obJson[dataIndex].time.split('T')[1].split('.')[0];
                this.lineChartLabels[j] = time.substring(0, time.length - 3);
            }
            catch (ex) {
                console.log(j);
            }
        }
        this.lineChartData = _lineChartData;
    };
    MeterkastMenuComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    };
    MeterkastMenuComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    MeterkastMenuComponent.prototype.chartHovered = function (e) {
        console.log(e);
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