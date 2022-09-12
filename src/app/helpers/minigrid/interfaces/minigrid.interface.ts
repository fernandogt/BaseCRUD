import { NumberSymbol } from '@angular/common';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Table } from 'src/app/helpers/datatable/models/table';
import { Column } from '../../datatable/models/column';


export interface TableParams {
  tableTitle: string;
  width: string;
  headerHeight: number;
  props: Array<string>;
  names: Array<string>;
  minWidths:  Array<any>;
  widths:  Array<any>;
  maxWidths:  Array<any>;
  pipes:  Array<any>;
  headerClasses:  Array<any>;
  cellClasses:  Array<any>;
  summaryFuncs:  Array<any>;
  visibles:  Array<any>;
  visibleDetails:  Array<any>;
}

export interface MinigridInterface {
  name: string;
  tableTitle: string;
  table: Table;
  search: any[];
  width: string;


  
  //controller: string;
  //title: string;
 // filterFields: any[];  
  //detailTitle: string;
 // detailLegend: string;
  //detailRow: Array<MinigridInterface>;
  //reportsId: string;
  //reportsGroup: string;
 
 // detail: any[];
 // modal: any[];
 // viewtabs: boolean;



}

export class Minigrid implements MinigridInterface {
  name: string = '';
  tableTitle: string;
  table: Table;
  search: any[] = [];
  width: string;

  constructor(data: any[], fields: TableParams) {
    this.tableTitle = fields.tableTitle;
    this.width = fields.width;
    
    let COLUMNS: Array<Column> = [];
    this.table = new Table(
      ColumnMode.standard,     // ColumnMode
        COLUMNS,              // Columns
      undefined,             // count
      undefined,            // cssClasses
      undefined,            // externalPaging
      undefined,            // externalSorting
      0,                   // footerHeight
      fields.headerHeight,                   // headerHeight
      undefined,            // messages
      undefined,            // limit
      true,            // loadingIndicator
      undefined,            // offset
      undefined,            // reorderable
      25,                   // rowHeight
      data,            // rows
      undefined,            // scrollbarH
      true,                 // scrollbarV
      undefined,            // selected
      SelectionType.multi, // selectionType
      undefined,            // summaryHeight
      undefined,            // summaryPosition
      undefined,            // summaryRow
      undefined,            // temp
    );
    fields.names.forEach((n, i) => {
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
     
   


  }
}

