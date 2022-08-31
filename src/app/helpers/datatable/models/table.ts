import { Column } from './column';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { SelectionType } from '@swimlane/ngx-datatable';

export class Table {
    constructor(
        public columnMode = ColumnMode.standard, // Modo de mostrar las columnas
        public columns: Array<Column>, // Columnas
        public count = 0,
        public cssClasses: object = {  // Clases de css para el paginador
            sortAscending: 'datatable-icon-down',
            sortDescending: 'datatable-icon-up',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        },
        public externalPaging = false,
        public externalSorting = false,
        public footerHeight = 0,
        public headerHeight = 30,
        public messages: object = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        },
        public limit: number = 25,
        public loadingIndicator = false,
        public offset = 0,
        public reorderable = true,
        public rowHeight: number,
        // public rowIdentity: number,
        public rows: any[] = [], // Datos
        public scrollbarH = false,
        public scrollbarV = false,
        public selected: any[] = [], // Registros seleccionados
        public selectionType: any = SelectionType.multi, // Modo de seleccion de registros
        public summaryHeight = 35,
        public summaryPosition = 'top',
        public summaryRow = false,
        public temp: any[] = []
    ) {
     
    }
    selectCheck = (row: any, column: any, value: any) => {
        return value !== 'Ethel Price';
    }
    displayCheck = (row: any, column: any, value: any) => {
        return row.name !== 'Ethel Price';
    }
}
