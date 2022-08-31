import { Component, OnInit, PipeTransform } from '@angular/core';
import { ParamClientes } from '../../models/param-clientes';
import { ParamClientesDetail1 } from '../../models/param-clientes-detail1';
import { ParamClientesDetail2 } from '../../models/param-clientes-detail2';
import { ParamClientesDetail3 } from '../../models/param-clientes-detail3';
//import { ok } from 'assert';
import { SupergridInterface } from '../../../helpers/supergrid/interfaces/supergrid.interface';
import { SingletonService } from '../../../singleton.service';
import { FormArray } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ParamClientesTab1 } from '../../models/param-clientes-tab1';
import { ParamClientesTab2 } from '../../models/param-clientes-tab2';

@Component({
  selector: 'app-grid-clientes',
  templateUrl: './grid-clientes.component.html',
  styleUrls: ['./grid-clientes.component.scss']
})
export class GridClientesComponent implements OnInit {

  paramgrid: SupergridInterface = new ParamClientes();
  
  message = '';
  numeroServicios = 0;
  totalBaseServicios = 0;
  totalImpuestoServicios = 0;
  totalServicios = 0;
 
  constructor(private singletonService: SingletonService, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {

  }

  onRowReceive($event: any) {
  // this.message = $event;
  console.log('ROW_RECEIVE');
    let row = $event;
    console.log(row);
    let url1 = (row.contrato < 100000 ? 'cabeceracontrato' : 'cabeceracontratoemp') + '/obtener/' + row.contrato;
    let url2 = 'cabeceraContrato/obtenerDetalle/' + row.contrato; 
    let url3 = '';   
    this.paramgrid.detailCol1 = [];
    this.paramgrid.detailCol2 = [];
    this.paramgrid.detailCol3 = [];

    // columna 1    

      let data1: Array<{campo: string, valor: any}> = [
        { campo: 'Nº Contrato', valor: row.contratoID },
        { campo: 'DNI', valor: row.nif },
        { campo: 'Cliente', valor: row.nombreCompleto },
        { campo: 'Dirección', valor: row.direccion },
        { campo: 'Tipo Cliente', valor: row.tipoCliente },
        { campo: 'Estado Contrato', valor: row.estado }
      ];
      console.log(data1);
     /* data1.push({ campo: 'Cliente', valor: result.nif + ' ' + result.nombreCompleto });
      data1.push({ campo: 'Contrato', valor: result.contratoID + '  Provisión: ' + [result.fechaProvision | fecha] });
      data1.push({ campo: 'Cliente', valor: result.nif + ' ' + result.nombreCompleto });*/
      this.paramgrid.detailCol1.push(new ParamClientesDetail1(data1));

     
    this.singletonService.getData(url2).subscribe(
      result => { 
 // columna 2   
        this.paramgrid.detailCol2.push(new ParamClientesDetail2(result));
// columna 3
       //this.detalleServiciosData = result;              
        this.numeroServicios = result.length;
        this.totalBaseServicios = result.reduce((a: any,b: any)=> a + (b['precio'] * b['cantidad'] || 0),0);
        this.totalImpuestoServicios = result.reduce((a: any, b: any)=> a + ((b['precio'] * b['cantidad'] * b['poripsi']/100) || 0),0);
        this.totalServicios= this.totalBaseServicios + this.totalImpuestoServicios;
        //console.log(this.detalleServiciosData);
        let data3: Array<{campo: string, valor: any}> = [
          { campo: 'Nº de Servicios', valor: this.decimalPipe.transform(this.numeroServicios, '1.0-0') },
          { campo: 'Base Serv. Principal', valor: this.decimalPipe.transform(row.precioPrincipal)  + ' €' },
          { campo: 'Base Serv. Secundarios', valor: this.decimalPipe.transform(this.totalBaseServicios - row.precioPrincipal, '1.2-2') + ' €' },
          { campo: 'Base Total', valor: this.decimalPipe.transform(this.totalBaseServicios, '1.2-2') + ' €' },
          { campo: 'Impuestos', valor: this.decimalPipe.transform(this.totalImpuestoServicios, '1.2-2') + ' €' },
          { campo: '---------------', valor: '------------------' },
          { campo: 'Total Servicios', valor: this.decimalPipe.transform(this.totalServicios, '1.2-2') + ' €' }
        ];
        this.paramgrid.detailCol3.push(new ParamClientesDetail3(data3));

      },
      err => console.log(err as any),
    );
// links
this.paramgrid.link1 = [];
this.paramgrid.link2 = [{label: 'link2-1', text: 'Texto2-1', url: '' }, {label: '', text: 'Texto2-2', url: '' }];
this.paramgrid.link3 = [{label: 'link3', text: 'Texto3', url: '/informes/indicadores/contratoscreados/' + row.fechaAlta }];






  }

  onTabReceive($event: any) {
    let row = $event;

    this.paramgrid.detailTabs.forEach(tab => {
      tab.minigrids = [];
    });

    let data1: Array<{campo: string, valor: any}> = [
      { campo: 'Nº Contrato', valor: row.contratoID },
      { campo: 'DNI', valor: row.nif },
      { campo: 'Cliente', valor: row.nombreCompleto },
      { campo: 'Dirección', valor: row.direccion },
      { campo: 'Tipo Cliente', valor: row.tipoCliente },
      { campo: 'Estado Contrato', valor: row.estado }
    ];

    this.paramgrid.detailTabs[0].minigrids.push(new ParamClientesTab1(data1));


    let url1 =  'facturas/obtenerporcontrato/' + row.contrato;
    this.singletonService.getData(url1).subscribe(
      result => { 
        console.log(result);
        this.paramgrid.detailTabs[1].minigrids.push(new ParamClientesTab2(result));
        console.log(this.paramgrid.detailTabs);
      },
      err => console.log(err as any),
    );
  }


}
