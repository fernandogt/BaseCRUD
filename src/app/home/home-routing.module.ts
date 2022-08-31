import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { Home2Component } from './pages/home2/home2.component';


const routes: Routes = [
  { path: 'm',component: HomeComponent },
  { path: 'd',component: Home2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }