import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
//import { Home2Component } from './pages/home2/home2.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent},
      //{ path: 'register', component: RegisterComponent},
      { path: '**', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }