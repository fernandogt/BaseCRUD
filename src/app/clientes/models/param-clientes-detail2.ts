import { ColumnMode, SelectionType} from '@swimlane/ngx-datatable';

import { Table } from '../../helpers/datatable/models/table';
import { Column } from '../../helpers/datatable/models/column';
import { MinigridInterface } from '../../helpers/minigrid/interfaces/minigrid.interface';
import { NumeroPipe } from 'src/app/pipes/numero.pipe';


export class ParamClientesDetail2 implements MinigridInterface {
    name = 'detalle2'; 
    tableTitle = 'Detalle de Contrato';
    table: Table;
    search: any[];
    width: string = '400px';
       
    constructor(data: any[]) {
        const COLUMNS = [
          new Column(
            'Servicio',  // name
            'codigoServicio',  // prop
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
            'Descripcion',  // name
            'descripcionServicio',  // prop
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
            c => 'Total:',   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'Precio',  // name
            'precio',  // prop
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
            new NumeroPipe('1.2-2'),   // pipe
            c => c.reduce((a,b) => (a + b)),   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'Cant.',  // name
            'cantidad',  // prop
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
            '% IPSI',  // name
            'poripsi',  // prop
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
          )
          
        ];

        this.table = new Table(
          ColumnMode.standard,     // ColumnMode
            COLUMNS,              // Columns
          undefined,             // count
          undefined,            // cssClasses
          undefined,            // externalPaging
          undefined,            // externalSorting
          0,                   // footerHeight
          25,                   // headerHeight
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
          25,            // summaryHeight
          'bottom',            // summaryPosition
          true,            // summaryRow
          undefined,            // temp
        );

        this.table.rows = data;

        this.search = [
          {label: 'Campo', prop: 'campo', placeholder: 'Campo'},         
          { label: 'Valor', prop: 'valor', placeholder: 'Valor'}       
         
        ];

    }
}
