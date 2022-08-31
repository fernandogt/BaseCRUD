import { Validators } from '@angular/forms';
import { ColumnMode, SelectionType} from '@swimlane/ngx-datatable';

import { SupergridInterface } from 'src/app/helpers/supergrid/interfaces/supergrid.interface';
import { Table } from '../../helpers/datatable/models/table';
import { Column } from '../../helpers/datatable/models/column';

import { FechaPipe } from '../../pipes/fecha.pipe';
import { NumeroPipe } from '../../pipes/numero.pipe';


export class ParamClientes implements SupergridInterface {
    name = 'Contratos';
    controller = 'cabeceracontrato';
    title = 'Atención al Cliente';
    icon = 16;
    iconUrl='url("../../../assets/img/icons/iconos-sprite32.png")';            
    tableTitle = 'Módulo de ATC';
    detailTitle = 'Registro seleccionado';
    detailLegend = '';
    reportsId = '';
    reportsGroup = 'indicadores';
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
            

    filterFields = [
      { param: 'fd', label: 'Fecha Desde', value: '20210101', type: 'f', list: [], validators: [Validators.required] },
      { param: 'fh', label: 'Fecha Hasta', value: '20990131', type: 'f', validators: [Validators.required], list: [] },
      { param: 'agrupa',
        label: 'Agrupación',
        list: [
          {value: 'todas', text: 'Todas'},
          {value: 'Servicio Principal Básico', text: 'Servicio Principal Básico'},
          {value: 'Servicio Principal Dúo', text: 'Servicio Principal Dúo'}
        ],
        type: 'c',
        value: 'todas',
        validators: [Validators.required]
      },
      { param: 'formapago',
        label: 'Forma Pago',
        list: [
          {value: 'todas', text: 'Todas'},
          {value: 'Transferencia', text: 'Transferencia'},
          {value: 'Domiciliado', text: 'Domiciliado'}
        ],
        type: 'c',
        value: 'todas',
        validators: [Validators.required]
      },
      { param: 'filternif', label: 'NIF' , value: 'todos', type: 't', validators: [], list: [] },
      { param: 'contra', label: 'Contrato' , value: 0, type: 'n', validators: [Validators.required, Validators.min(0)], list: [] },
      { param: 'tipo',
        label: 'Tipo',
        list: [
            { value: 'todos', text: 'Todos' },
            { value: 'Residencial', text: 'Residencial' },
            { value: 'Empresa', text: 'Empresa' },
            { value: 'Empleado', text: 'Empleado' }
          ],
        type: 'c',
        value: 'todos',
        validators: [Validators.required]
      },
      { param: 'esta',
        label: 'Estado',
        list: [
          {value: 'todos', text: 'Todos los Estados'},
          {value: 'NO COBRADO', text: 'No Cobrado'},
          {value: 'PENDIENTE', text: 'Pendiente'}
        ],
        type: 'c',
        value: 'todos',
        validators: [Validators.required]
      }
    ];
  
       
    constructor() {
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
        const COLUMNS = [
          new Column(
            'ContratoID',  // name
            'contratoID',  // prop
            1,          // flexGrow
            100,  // minWidth
            100,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'F. Contrato',  // name
            'fechaAlta',  // prop
            1,          // flexGrow
            100,  // minWidth
            100,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            new FechaPipe(),   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'F. Provision',  // name
            'fechaProvision',  // prop
            1,          // flexGrow
            100,  // minWidth
            100,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            new FechaPipe(),   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'F. Baja',  // name
            'fechaBaja',  // prop
            1,          // flexGrow
            100,  // minWidth
            100,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            new FechaPipe(),   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'Estado',  // name
            'estado',  // prop
            1,          // flexGrow
            50,  // minWidth
            150,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),                       
          new Column(
            'Tipo Cliente',  // name
            'tipoCliente',  // prop
            1,          // flexGrow
            100,  // minWidth
            100,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
           new Column(
            'NIF',  // name
            'nif',  // prop
            1,          // flexGrow
            100,  // minWidth
            150,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            false // visibleDetail
          ) ,
          new Column(
              'Nombre',  // name
              'nombre',  // prop
              1,          // flexGrow
              undefined,  // minWidth
              undefined,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              false // visibleDetail
            ),
          new Column(
              'Apellido 1',  // name
              'apellido1',  // prop
              1,          // flexGrow
              undefined,  // minWidth
              undefined,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              false // visibleDetail
            ),
          new Column(
              'Apellido 2',  // name
              'apellido2',  // prop
              1,          // flexGrow
              undefined,  // minWidth
              undefined,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              false // visibleDetail
            ),
            new Column(
              'Servicio Principal',  // name
              'servicioPrincipal',  // prop
              1,          // flexGrow
              100,  // minWidth
              200,  // maxWidth
              200,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Precio',  // name
              'precioPrincipal',  // prop
              1,          // flexGrow
              100,  // minWidth
              100,  // maxWidth
              80,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              'tar',  // headerClass
              'tar',  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              new NumeroPipe('1.2-2'),    // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Domicilio',  // name
              'direccion',  // prop
              1,          // flexGrow
              100,  // minWidth
              350,  // maxWidth
              220,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Zona FTTH',  // name
              'zonaFTTH',  // prop
              1,          // flexGrow
              100,  // minWidth
              200,  // maxWidth
              200,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Nodo',  // name
              'nodo',  // prop
              1,          // flexGrow
              100,  // minWidth
              200,  // maxWidth
              200,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Troncal',  // name
              'troncal',  // prop
              1,          // flexGrow
              100,  // minWidth
              200,  // maxWidth
              200,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              false,       // visible
              false // visibleDetail
            ),
            new Column(
              'Manzana',  // name
              'manzana',  // prop
              1,          // flexGrow
              100,  // minWidth
              200,  // maxWidth
              200,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              false,       // visible
              false // visibleDetail
            ),
            new Column(
              'Teléfono 1',  // name
              'telefono1',  // prop
              1,          // flexGrow
              100,  // minWidth
              100,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Teléfono 2',  // name
              'telefono2',  // prop
              1,          // flexGrow
              100,  // minWidth
              100,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              false // visibleDetail
            ),
            new Column(
              'Móvil',  // name
              'movil',  // prop
              1,          // flexGrow
              100,  // minWidth
              100,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),  
            new Column(
              'Email',  // name
              'email',  // prop
              1,          // flexGrow
              100,  // minWidth
              500,  // maxWidth
              250,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
            new Column(
              'Forma Pago',  // name
              'formaPago',  // prop
              1,          // flexGrow
              50,  // minWidth
              200,  // maxWidth
              100,   // width
              undefined,  // resizeable
              undefined,  // sortable
              undefined,  // draggable
              undefined,  // canAutoResize
              undefined,  // checkboxable
              undefined,  // headerCheckboxable
              undefined,  // headerClass
              undefined,  // cellClass
              undefined,  // frozenLeft
              undefined,  // frozenRight
              undefined,   // pipe
              undefined,   // summaryFunc
              true,       // visible
              true // visibleDetail
            ),
          new Column(
            'Grupo Servicio',  // name
            'descrigrupo',  // prop
            1,          // flexGrow
            100,  // minWidth
            250,  // maxWidth
            220,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'srvalta',  // name
            'srvalta',  // prop
            1,          // flexGrow
            100,  // minWidth
            200,  // maxWidth
            200,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            false,       // visible
            false // visibleDetail
          ),
          new Column(
            'IBAN',  // name
            'iban',  // prop
            1,          // flexGrow
            100,  // minWidth
            200,  // maxWidth
            200,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            false // visibleDetail
          ) ,
          new Column(
            'F. Elect.',  // name
            'facturae',  // prop
            1,          // flexGrow
            20,  // minWidth
            200,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            false,       // visible
            false // visibleDetail
          ),
          new Column(
            'GrupoId',  // name
            'grupo',  // prop
            1,          // flexGrow
            20,  // minWidth
            100,  // maxWidth
            500,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            false,       // visible
            false // visibleDetail
          ),
          new Column(
            'Peninsular',  // name
            'isp',  // prop
            1,          // flexGrow
            20,  // minWidth
            200,  // maxWidth
            50,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            false,       // visible
            false // visibleDetail
          ),
          new Column(
            'CentroId',  // name
            'centro',  // prop
            1,          // flexGrow
            20,  // minWidth
            150,  // maxWidth
            100,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            false,       // visible
            false // visibleDetail
          ),
          new Column(
            'Usuario',  // name
            'usuario',  // prop
            1,          // flexGrow
            100,  // minWidth
            200,  // maxWidth
            200,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            undefined,  // headerClass
            undefined,  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            false,       // visible
            false // visibleDetail
          )
          
        ];

        this.table = new Table(
          ColumnMode.standard,     // ColumnMode
            COLUMNS,              // Columns
          undefined,             // count
          undefined,            // cssClasses
          undefined,            // externalPaging
          undefined,            // externalSorting
          50,                   // footerHeight
          35,                   // headerHeight
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


    }
}
