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
var MeterkastMenuComponent = (function () {
    function MeterkastMenuComponent() {
        this.gettodoUrls = "http://keijzersoft.nl:8081/apiV1/gettodos";
        this.addTodoUrl = "http://keijzersoft.nl:8081/apiV1/addtodo";
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
    MeterkastMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'meterkastMenu',
            templateUrl: './meterkastMenu.component.html',
            styleUrls: ['./meterkastMenu.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], MeterkastMenuComponent);
    return MeterkastMenuComponent;
}());
exports.MeterkastMenuComponent = MeterkastMenuComponent;
//# sourceMappingURL=meterkastMenu.component.js.map