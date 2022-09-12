import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { Home2Component } from './pages/home2/home2.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSlideToggleModule
  ],
  declarations: [HomeComponent, Home2Component]
})
export class HomeModule { }