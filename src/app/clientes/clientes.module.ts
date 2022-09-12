import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { GridClientesComponent } from './pages/grid-clientes/grid-clientes.component';
import { CrudClientesComponent } from './pages/crud-clientes/crud-clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { SupergridComponent } from '../helpers/supergrid/components/supergrid/supergrid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FechaPipe } from '../pipes/fecha.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MinigridComponent } from '../helpers/minigrid/components/minigrid/minigrid.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SupergridModule } from '../helpers/supergrid/supergrid.module';
import { MinigridModule } from '../helpers/minigrid/minigrid.module';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    MatSlideToggleModule,
    SupergridModule,
    MinigridModule
  ],
  declarations: [GridClientesComponent, CrudClientesComponent]
})
export class ClientesModule { }