import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridClientesComponent } from './pages/grid-clientes/grid-clientes.component';


const routes: Routes = [
  {
    path: '',
    component: GridClientesComponent
    /*children: [
      { path: ''}
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }