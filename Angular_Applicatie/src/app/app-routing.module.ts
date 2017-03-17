import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import{TodoListComponent} from './todolist.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'todolist',component:TodoListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
