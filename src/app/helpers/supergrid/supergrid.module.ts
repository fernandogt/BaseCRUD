import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MinigridModule } from '../minigrid/minigrid.module';
import { SupergridComponent } from './components/supergrid/supergrid.component';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { SupergridRoutingModule } from './supergrid-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SupergridRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    MatSlideToggleModule,
    MinigridModule
  ],
  declarations: [SupergridComponent, FechaPipe],
  exports: [SupergridComponent],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupergridModule { }