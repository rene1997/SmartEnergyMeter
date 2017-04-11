"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login.component");
var register_component_1 = require("./register.component");
var hardware_component_1 = require("./hardware.component");
var meterkastMenu_component_1 = require("./meterkastMenu.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.JsonpModule,
            ng2_charts_1.ChartsModule
        ],
        declarations: [app_component_1.AppComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            hardware_component_1.HardwareComponent,
            meterkastMenu_component_1.MeterkastMenuComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map