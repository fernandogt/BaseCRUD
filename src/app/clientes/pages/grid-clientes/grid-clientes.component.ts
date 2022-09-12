import { Component, OnInit, PipeTransform } from '@angular/core';
import { ParamClientes } from '../../models/param-clientes';
import { ParamClientesDetail1 } from '../../models/param-clientes-detail1';
import { ParamClientesDetail2 } from '../../models/param-clientes-detail2';
import { ParamClientesDetail3 } from '../../models/param-clientes-detail3';
//import { ok } from 'assert';
import { SupergridInterface, Supergrid } from '../../../helpers/supergrid/interfaces/supergrid.interface';
import { SingletonService } from '../../../singleton.service';
import { FormArray, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ParamClientesTab1 } from '../../models/param-clientes-tab1';
import { ParamClientesTab2 } from '../../models/param-clientes-tab2';
import { Minigrid, MinigridInterface, TableParams } from 'src/app/helpers/minigrid/interfaces/minigrid.interface';

import { NumeroPipe } from 'src/app/pipes/numero.pipe';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';



@Component({
  selector: 'app-grid-clientes',
  templateUrl: './grid-clientes.component.html',
  styleUrls: ['./grid-clientes.component.scss']
})
export class GridClientesComponent implements OnInit {

 //paramgrid: SupergridInterface = new ParamClientes();
  paramgrid: SupergridInterface;
  message = '';
  numeroServicios = 0;
  totalBaseServicios = 0;
  totalImpuestoServicios = 0;
  totalServicios = 0;
 
  constructor(private singletonService: SingletonService, private decimalPipe: DecimalPipe) {


    // CONFIGURACIONES GENERALES DEL SUPERGRID
    // ---------------------------------------------- 
    let principalgrid = {
      name: 'Contratos',
      controller: 'cabeceracontrato',
      title: 'Atención al Cliente',
      icon: 16,
      iconUrl: 'url("../../../assets/img/icons/iconos-sprite32.png")',
      tableTitle: 'Módulo de ATC',
      detailTitle: 'Registro seleccionado',
      detailLegend: '',
      reportsId: '',
      reportsGroup: 'indicadores',
      headerHeight: 25,
    }


         /* modal: any;
          viewtabs= true;

          detailCol1 = [];
          detailCol2 = [];
          detailCol3 = [];
          link1 = [];
          link2 = [{label: 'link2-1', text: 'Texto2-1', url: '' }, {label: '', text: 'Texto2-2', url: '' }];
          link3 = [{label: 'link3', text: 'Texto3', url: '/informes/indicadores/contratoscreados/20201231' }];
          alignLink1 = 'left';
          alignLink2 = 'center';
          alignLink3 = 'center';
          detailTabs = [
            { name: 'tab1', minigrids: []},
            { name: 'tab2', minigrids: []},
            { name: 'tab3', minigrids: []},
            { name: 'tab4', minigrids: []}
          ];*/
        
        // BARRA DE FILTRADO
        // -------------------------------------------------------------------------------------
        let filterFields = [
          { param: 'fd', label: 'Fecha Desde', value: '20210101', type: 'f', list: [], validators: [Validators.required] },
          { param: 'fh', label: 'Fecha Hasta', value: '20990131', type: 'f', validators: [Validators.required], list: [] },
          { param: 'agrupa', label: 'Agrupación',
            list: [
              {value: 'todas', text: 'Todas'},
              {value: 'Servicio Principal Básico', text: 'Servicio Principal Básico'},
              {value: 'Servicio Principal Dúo', text: 'Servicio Principal Dúo'}
            ],
            type: 'c', value: 'todas', validators: [Validators.required]
          },
          { param: 'formapago',label: 'Forma Pago',
            list: [
              {value: 'todas', text: 'Todas'},
              {value: 'Transferencia', text: 'Transferencia'},
              {value: 'Domiciliado', text: 'Domiciliado'}
            ],
            type: 'c', value: 'todas', validators: [Validators.required]
          },
          { param: 'filternif', label: 'NIF' , value: 'todos', type: 't', validators: [], list: [] },
          { param: 'contra', label: 'Contrato' , value: 0, type: 'n', validators: [Validators.required, Validators.min(0)], list: [] },
          { param: 'tipo', label: 'Tipo',
            list: [
                { value: 'todos', text: 'Todos' },
                { value: 'Residencial', text: 'Residencial' },
                { value: 'Empresa', text: 'Empresa' },
                { value: 'Empleado', text: 'Empleado' }
              ],
            type: 'c', value: 'todos', validators: [Validators.required]
          },
          { param: 'esta', label: 'Estado',
            list: [
              {value: 'todos', text: 'Todos los Estados'},
              {value: 'NO COBRADO', text: 'No Cobrado'},
              {value: 'PENDIENTE', text: 'Pendiente'}
            ],
            type: 'c', value: 'todos', validators: [Validators.required]
          }
        ];


        // CAMPOS DE BUSQUEDA
        // -------------------------------------------------------------------------------------
        let search = [
          { label: 'Contrato ID', prop: 'contratoID', placeholder: 'Contrato ID'},
          { label: 'TipoCliente', prop: 'tipoCliente', placeholder: 'TipoCliente'},
          {label: 'NIF', prop: 'nif', placeholder: 'NIF'},
          { label: 'Nombre Cliente', prop: 'nombre', placeholder: 'Nombre Cliente' },
          { label: 'Apellido 1', prop: 'apellido1', placeholder: 'Apellido1' },
          { label: 'Apellido 2', prop: 'apellido2', placeholder: 'Apellido2' },
          { label: 'Telefono1  ', prop: 'telefono1', placeholder: 'telefono1' },
          { label: 'Telefono2  ', prop: 'telefono2', placeholder: 'telefono2' },
          { label: 'Movil  ', prop: 'movil', placeholder: 'movil' },
          { label: 'ServicioPrincipal', prop: 'servicioPrincipal', placeholder: 'ServicioPrincipal'},
          { label: 'Estado', prop: 'estado', placeholder: 'Estado'},
          { label: 'IBAN  ', prop: 'iban', placeholder: 'IBAN' }
        ];
    


        // CAMPOS DEL DATAGRID
        // -------------------------------------------------------------------------------------
        //fields{
          let fields: TableParams = {
            tableTitle: 'Atención al cliente',
            width: '402px',
            headerHeight: 25,
            names: ['ContratoID','F. Contrato', 'F. Provision', 'F. Baja', 'Estado', 'Tipo Cliente', 'NIF', 'Nombre', 'Apellido 1', 'Apellido2', 'Servicio Principal',         'Precio', 'Domicilio', 'Zona FTTH', 'Nodo', 'Troncal', 'Manzana', 'Teléfono 1', 'Teléfono 2', 'Móvil', 'Email', 'Forma Pago', 'Grupo Servicio', 'srvalta', 'IBAN', 'F. Elect.', 'GrupoId', 'Peninsular', 'CentroId', 'Usuario'],
            props: ['contratoID','fechaAlta', 'fechaProvision', 'fechaBaja', 'estado', 'tipoCliente', 'nif', 'nombre', 'apellido1', 'apellido2', 'servicioPrincipal', 'precioPrincipal', 'direccion', 'zonaFTTH', 'nodo', 'troncal', 'manzana', 'telefono1', 'telefono2', 'movil', 'email', 'formaPago',        'descrigrupo', 'srvalta', 'iban', 'facturae', 'grupo', 'isp', 'centro', 'usuario' ],
            minWidths: [     100,        100,              100,         100,      50,           100,   100,   undefined, undefined,  undefined,                100,                  80,          100,        100,    100,      100,       100,         100,         100,       100,  100,           50,                  100,       100,   100,          20,    20,     20,   20,      100],
            widths: [        100,        100,              100,         100,     100,           100,   100,        100,        100,      100,                  200,                  80,           220,       200,    200,      200,       200,         100,         100,       100,  100,          100,                  220,       200,    200,        100,   100,     50,   100,     200],
            maxWidths: [     100,        100,              100,         100,     100,           100,   150,   undefined, undefined, undefined,                 200,                 100,           350,       200,    200,      200,       200,         100,         100,       100,  100,          200,                  250,       200,    200,        200,   100,    200,   150,     200],
            pipes: [   undefined,  new FechaPipe(),        new FechaPipe(),   new FechaPipe(), undefined,   undefined, undefined, undefined, undefined, undefined, undefined, new NumeroPipe('1.2-2'),     undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,          undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            headerClasses: [   undefined,  undefined,        undefined,   undefined, undefined,   undefined, undefined, undefined, undefined, undefined, undefined,  undefined,'tar', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,          undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            cellClasses: [   undefined,  undefined,        undefined,   undefined, undefined,   undefined, undefined, undefined, undefined, undefined,  undefined,  undefined, 'tar', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,          undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            summaryFuncs: [   undefined,  undefined,        undefined,   undefined, undefined,   undefined, undefined, undefined, undefined, undefined,         undefined,           undefined,     undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,          undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            visibles: [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            visibleDetails: [ true,true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
          }


          //  }
      this.paramgrid = new Supergrid(principalgrid, fields, search, filterFields);
   }

  ngOnInit(): void {

    }

  onRowReceive($event: any) {
  // this.message = $event;
  console.log('ROW_RECEIVE');

 


 

    let row = $event;
    console.log(row);
    // origenes de datos
    let url1 = (row.contrato < 100000 ? 'cabeceracontrato' : 'cabeceracontratoemp') + '/obtener/' + row.contrato;
    let url2 = 'cabeceraContrato/obtenerDetalle/' + row.contrato; 
    let url3 = '';   
    // columnas minigrid detalle (3)
    this.paramgrid.detailCol1 = [];
    this.paramgrid.detailCol2 = [];
    this.paramgrid.detailCol3 = [];

// DETALLES DE LOS MINIGRIDS
// -------------------------------------------------------------------------------------
 // Columna 1    
      // parametros 1
      let params1: TableParams = {
         tableTitle: 'Cabecera de Contrato',
         width: '402px',
         headerHeight: 1,
         names: ['Campo','Valor'],
         props: ['campo','valor'],
         minWidths: [ 100,    100   ],
         widths: [ 300,    300   ],
         maxWidths: [ 300,    300   ],
         pipes: [ undefined, undefined],
         headerClasses: ['negrita', undefined],
         cellClasses: ['negrita', undefined],
         summaryFuncs: [ undefined, undefined],
         visibles: [ true,true],
         visibleDetails: [ true,true]
      }
      // datos 1
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
      let imini1 = new Minigrid(data1, params1);
      this.paramgrid.detailCol1.push(imini1);

     
    this.singletonService.getData(url2).subscribe(
      result => { 
 // Columna 2         
      // parametros 2
      let params2: TableParams = {
        tableTitle: 'Detalle de Contrato',
        width: '400px',
        headerHeight: 25,
        names: ['Servicio',      'Descripcion',        'Precio','Cant.',   '% IPSI' ],
        props: ['codigoServicio','descripcionServicio','precio','cantidad','poripsi'],
        minWidths: [ 100, 100, 100, 100, 100],
        widths: [ 100, 100, 100, 100, 100],
        maxWidths: [ 100, 100, 100, 100, 100],
        pipes: [ undefined, undefined, new NumeroPipe('1.2-2'), undefined, undefined],
        headerClasses: [ undefined, undefined, undefined, undefined, undefined],
        cellClasses: [ undefined, undefined, undefined, undefined, undefined],
        summaryFuncs: [ undefined, (c: any) => 'Total:',  (c:any) => c.reduce((a:any,b:any) => (a + b)), undefined, undefined, undefined],
        visibles: [ true,true,true,true,true],
        visibleDetails: [ true,true,true,true,true]
      }
        
      // datos 2
        let imini2 = new Minigrid(result, params2);
        this.paramgrid.detailCol2.push(imini2);     

        
// columna 3
      // parametros 3

      let params3: TableParams = {
        tableTitle: 'Totales de Contrato',
        width: '262px',
        headerHeight: 1,
        names: ['Campo','Valor'],
        props: ['campo','valor'],
        minWidths: [ 100,    100   ],
        widths: [ 300,    300   ],
        maxWidths: [ 300,    300   ],
        pipes: [ undefined, undefined],
        headerClasses: ['negrita', undefined],
        cellClasses: ['negrita', 'tar'],
        summaryFuncs: [ undefined, undefined],
        visibles: [ true,true],
        visibleDetails: [ true,true]
     }
        
     // datos 3
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
        let imini3 = new Minigrid(data3, params3);
        this.paramgrid.detailCol3.push(imini3);


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

// TAB 1
    // parametros T1
    let paramsT1: TableParams = {
      tableTitle: 'Cabecera de Contrato',
      width: '402px',
      headerHeight: 1,
      names: ['Campo','Valor'],
      props: ['campo','valor'],
      minWidths: [ 100,    100   ],
      widths: [ 100,    300   ],
      maxWidths: [ 300,    300   ],
      pipes: [ undefined, undefined],
      headerClasses: ['negrita', undefined],
      cellClasses: ['negrita', undefined],
      summaryFuncs: [ undefined, undefined],
      visibles: [ true,true],
      visibleDetails: [ true,true]
   }
  
    // datos tab1
    let data1: Array<{campo: string, valor: any}> = [
      { campo: 'Nº Contrato', valor: row.contratoID },
      { campo: 'DNI', valor: row.nif },
      { campo: 'Cliente', valor: row.nombreCompleto },
      { campo: 'Dirección', valor: row.direccion },
      { campo: 'Tipo Cliente', valor: row.tipoCliente },
      { campo: 'Estado Contrato', valor: row.estado }
    ];
    let iminiT1 = new Minigrid(data1, paramsT1); 
    this.paramgrid.detailTabs[0].minigrids.push(iminiT1);


// TAB 2
    // parametros T2
    let paramsT2: TableParams = {
      tableTitle: 'Histórico de Factura',
      width: '100%',
      headerHeight: 25,
      names: ['Factura',  'Descripcion','Base','€'],
      props: ['FacturaID','fechaFactura','base0','totalFactura'],
      minWidths: [ 50,         50   ,         50,      50],
      widths: [ 50,         50   ,         50,      50],
      maxWidths: [ 50,         50   ,         50,      50],
      pipes: [ undefined, undefined, undefined, undefined],
      headerClasses: ['negrita', undefined, undefined, undefined],
      cellClasses: ['negrita', undefined, undefined, undefined],
      summaryFuncs: [ undefined, undefined, undefined, undefined],
      visibles: [ true,true,true,true],
      visibleDetails: [ true,true,true,true]
   }
    // datos tab2
    let url1 =  'facturas/obtenerporcontrato/' + row.contrato;
    this.singletonService.getData(url1).subscribe(
      result => {         
        console.log(result);
        let iminiT2 = new Minigrid(result, paramsT2); 
        this.paramgrid.detailTabs[1].minigrids.push(iminiT2);
        console.log(this.paramgrid.detailTabs);
      },
      err => console.log(err as any),
    );
  }


}
