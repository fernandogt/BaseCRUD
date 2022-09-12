import { ColumnMode, SelectionType} from '@swimlane/ngx-datatable';

import { Table } from '../../helpers/datatable/models/table';
import { Column } from '../../helpers/datatable/models/column';
import { MinigridInterface } from '../../helpers/minigrid/interfaces/minigrid.interface';


export class ParamClientesDetail1 implements MinigridInterface {
    name = 'detalle1'; 
    tableTitle = 'Cabecera de Contrato';
    table: Table;
    search: any[];
    conf = 1;
    width = '402px';
    formato='R';
    anombres: string[] = [];
    awidth: number[] = [];
       
    constructor(data: any[]) {
      
        const COLUMNS = [
          new Column(
            'Campo',  // name
            'campo',  // prop
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
            'Valor',  // name
            'valor',  // prop
            1,          // flexGrow
            100,  // minWidth
            300,  // maxWidth
            300,   // width
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
          1,                   // headerHeight
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
