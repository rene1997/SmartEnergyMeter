import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent }  from './app.component';
import {LoginComponent}  from'./login.component';
import {RegisterComponent} from'./register.component';
import {MeterkastMenuComponent} from './meterkastMenu-component';

@NgModule({
  imports: [ BrowserModule,
             HttpModule,
             AppRoutingModule,
             FormsModule,
             JsonpModule,
             ChartsModule
            ],
  declarations: [ AppComponent,
                  LoginComponent,
                  RegisterComponent,
                  MeterkastMenuComponent
                ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
