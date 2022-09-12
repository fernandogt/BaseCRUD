import { ColumnMode, SelectionType} from '@swimlane/ngx-datatable';

import { Table } from '../../helpers/datatable/models/table';
import { Column } from '../../helpers/datatable/models/column';
import { MinigridInterface } from '../../helpers/minigrid/interfaces/minigrid.interface';


export class ParamClientesTab2 implements MinigridInterface {
    name = 'tab2'; 
    tableTitle = 'Histórico de Facturas';
    table: Table;
    search: any[];
    conf = 0;
    width = '100%';
       
    constructor(data: any[]) {
      
        const COLUMNS = [
          new Column(
            'Factura',  // name
            'facturaID',  // prop
            1,          // flexGrow
            50,  // minWidth
            50,  // maxWidth
            50,   // width
            undefined,  // resizeable
            undefined,  // sortable
            undefined,  // draggable
            undefined,  // canAutoResize
            undefined,  // checkboxable
            undefined,  // headerCheckboxable
            'negrita',  // headerClass
            'negrita',  // cellClass
            undefined,  // frozenLeft
            undefined,  // frozenRight
            undefined,   // pipe
            undefined,   // summaryFunc
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'Descripción',  // name
            'fechaFactura',  // prop
            1,          // flexGrow
            50,  // minWidth
            50,  // maxWidth
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
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            'Base',  // name
            'base0',  // prop
            1,          // flexGrow
            50,  // minWidth
            50,  // maxWidth
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
            true,       // visible
            true // visibleDetail
          ),
          new Column(
            '€',  // name
            'totalFactura',  // prop
            1,          // flexGrow
            50,  // minWidth
            50,  // maxWidth
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

        this.table.rows = data;

        this.search = [
          {label: 'Campo', prop: 'campo', placeholder: 'Campo'},         
          { label: 'Valor', prop: 'valor', placeholder: 'Valor'}       
         
        ];

    }
}
