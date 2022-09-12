import { MinigridInterface, TableParams } from 'src/app/helpers/minigrid/interfaces/minigrid.interface';
import { Table } from 'src/app/helpers/datatable/models/table';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Column } from '../../datatable/models/column';
import { Validators } from '@angular/forms';

interface field {
  param: string;
  label: string;
  value: any;
  type: string;
  validators: any[],
  list: any[]
}


interface link {
  label: string;
  text: string;
  url: string;  
}

interface tab {
  name: string;
  minigrids: Array<MinigridInterface>;

}
export interface SupergridInterface {
  // principales
    name: string;
    controller: string;
    title: string;
    icon: number;
    iconUrl: string;
   // filterParams: any;
    filterFields: Array<field>;    
    tableTitle: string;
    detailTitle: string;
    detailLegend: string;
  //detalles
    detailCol1: Array<MinigridInterface>;
    detailCol2: Array<MinigridInterface>;
    detailCol3: Array<MinigridInterface>;
    link1: Array<link>;
    link2: Array<link>;
    link3: Array<link>;
    alignLink1: string;
    alignLink2: string;
    alignLink3: string;
    detailTabs: Array<tab>;
    reportsId: string;
    reportsGroup: string;
    table: Table;
    search: Array<{label: string, prop: string, placeholder:string}>;
   // filter: any[];
    // detail: any[];
    modal: any[];
    viewtabs: boolean;
}

// CLASE DE LA INTERFACE

export class Supergrid implements SupergridInterface {
  name: string;
  controller: string;
  title: string;
  icon: number;
  iconUrl: string;
  filterFields: Array<field>;
  tableTitle: string;
  detailTitle: string;
  detailLegend: string;
  reportsId: string;
  reportsGroup: string;

  // inicializar detalles
  table: Table;
  search: Array<{label: string, prop: string, placeholder:string}> = [];
  //filter: any[];
  //detail: any[];
  modal: any;
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
  ];

  constructor(principalgrid: any, fields: TableParams, search: any, filterFields: any) {
    this.name = principalgrid.name;
    this.controller = principalgrid.controller;
    this.title = principalgrid.title;
    this.icon = principalgrid.icon;
    this.iconUrl = principalgrid.iconUrl;
    this.tableTitle = principalgrid.tableTitle;
    this.detailTitle = principalgrid.detailTitle;
    this.detailLegend = principalgrid.detailLegend;
    this.reportsId = principalgrid.reportsId;
    this.reportsGroup = principalgrid.reportsGroup;


    let COLUMNS: Array<Column> = [];
    this.table = new Table(
      ColumnMode.standard,     // ColumnMode
        COLUMNS,              // Columns
      undefined,             // count
      undefined,            // cssClasses
      undefined,            // externalPaging
      undefined,            // externalSorting
      0,                   // footerHeight
      principalgrid.headerHeight,                   // headerHeight
      undefined,            // messages
      undefined,            // limit
      true,            // loadingIndicator
      undefined,            // offset
      undefined,            // reorderable
      25,                   // rowHeight
      undefined,            // rows
      undefined,            // scrollbarH
      true,                 // scrollbarV
      undefined,            // selected
      SelectionType.multi, // selectionType
      undefined,            // summaryHeight
      undefined,            // summaryPosition
      undefined,            // summaryRow
      undefined,            // temp
    );
    fields.names.forEach((n: any, i: any) => {
      COLUMNS.push(new Column('','',undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined,undefined));
      this.table.columns[i].name = n;
      this.table.columns[i].prop = fields.props[i];
      this.table.columns[i].minWidth = fields.minWidths[i];
      this.table.columns[i].width = fields.widths[i];
      this.table.columns[i].maxWidth = fields.maxWidths[i];
      this.table.columns[i].pipe = fields.pipes[i];
      this.table.columns[i].headerClass = fields.headerClasses[i];
      this.table.columns[i].cellClass = fields.cellClasses[i];
      this.table.columns[i].summaryFunc = fields.summaryFuncs[i];
      this.table.columns[i].visible = fields.visibles[i];
      this.table.columns[i].visibleDetail = fields.visibleDetails[i];

    });

    this.search = [
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

    this.filterFields = [
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

    
  }
}



