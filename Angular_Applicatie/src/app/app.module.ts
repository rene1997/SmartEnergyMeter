import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent }  from './app.component';
import {LoginComponent}  from'./login.component';
import {RegisterComponent} from'./register.component';
import {TodoListComponent} from './todolist.component';

@NgModule({
  imports: [ BrowserModule,
             HttpModule,
             AppRoutingModule,
             FormsModule,
             JsonpModule
            ],
  declarations: [ AppComponent,
                  LoginComponent,
                  RegisterComponent,
                  TodoListComponent
                ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
