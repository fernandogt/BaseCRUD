import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { Column } from 'src/app/helpers/datatable/models/column';
import { SupergridInterface } from '../../interfaces/supergrid.interface';

//import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';

/*
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;  
*/
import jsPDF, { jsPDFOptions } from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';

import { SingletonService } from 'src/app/singleton.service';
import { ParamClientes } from 'src/app/clientes/models/param-clientes';
import autoTable, { UserOptions } from 'jspdf-autotable';

interface IExportHeaders {
  header: string;
  dataKey: string;
}

@Component({
  selector: 'app-supergrid',
  templateUrl: './supergrid.component.html',
  styleUrls: ['./supergrid.component.scss']
})
export class SupergridComponent implements OnInit {  
  
  @ViewChild('datatable', { static: false }) tabla!: DatatableComponent;
  @ViewChild('combo') combo!: ElementRef;
  @ViewChild('busqueda') busqueda!: ElementRef;
  @ViewChild('table') table!: ElementRef;
  @ViewChild('paginador') paginador!: DatatableComponent;
  @ViewChild('sectionContent') sectionContent!: ElementRef;
    
  @Input() cSection!: SupergridInterface;

  @Output() rowSend = new EventEmitter<any>();
  @Output() tabSend = new EventEmitter<any>();

  
  message: string = "Hola Mundo!";

  filterForm!: FormGroup;  // formulario del Filtrado
  selectedRow: any;  // variable contraladora del registro seleccionado
  anyExpandedRow = false; //  interruptor para controlar si esta abierto detalle de un registro 
  pageWithExpanded = false;  // idem para controlar que se cierre si se cambia de pagina
  expandedRow: JSON | undefined; // row seleccionado para ver detalle (suele ser el selectedRow)
  mode = false; // INTERUPTOR DE seleccion
  pinnedController = false; 

  //: string; // 
   showMore = false; // booleano del link mostrar más si está o no activo
  showAdvert = false; // booleano para saber si se muestra el loading de lince
  modal = false; // booleano boton de fijación columnas
  viewRow = false; //boolean para mostrar registro (que será el formulario del registro)
  
  cargarFiltrado: boolean | undefined;  // booleano de control si se cargan los datos del apartado de filtrado
  mostrarFiltrado: boolean | undefined;// booleano de control si se muestra el apartado de filtrado
  isSelectedSearch = false;  // control si se esta haciendo busqueda rapida

  total1:any;
  total2:any;
  total3:any;

  viewtabs: boolean | undefined;  // si se muestran los tabs
  viewGraficas = false; // si se muestran graficas

  filter: any;  // FILTRADO
    
  private unsubsDatatable$ = new Subject<void>();
  private unsubsDetail$ = new Subject<void>();


 // VARIABLES DE CONTROL DE PANTALLA
  tablaWidth = '69.4%';  // eventos de control de ancho del datatable con respecto a la parte derecha
  isResizing = false; // booleano para los eventos de control de anch del datatable
  isShowingDetalle = true; // booleano para controlar si se muestra o no apartado de la derecha (detalle)
  private initialHolderPosition: number | undefined; 
  private initialTableWidthPx: number | undefined;
 
  constructor(private singletonService: SingletonService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('INICIA');
    let o: any = {};
    this.filter = {};
    this.cSection?.filterFields.forEach(field => {
      let day = parseInt(field.value.toString().substr(6, 2));
      let month = parseInt(field.value.toString().substr(4, 2));
      let year = parseInt(field.value.toString().substr(0, 4));

      if (field.type === 'f') {
        o[field.param] = [{day: day, month: month, year: year}, field.validators];
      } else {
        o[field.param] = [(field.type === 't' && (field.value === 'todos' || field.value === 'todas')) ? '' : field.value, field.validators];
      }
      this.filter[field.param] = field.value;

    });
    console.log(o);
    this.filterForm = this.formBuilder.group(o);
    this.viewtabs = this.cSection?.viewtabs;
    if (this.cSection) {      
     // this.filter = this.cSection.filterParams;      
      this.getDatatableData(this.cSection.controller + '/filtrar/' + this.objectToUrlParams(this.filter));
    }
  }

  onSubmitFilter() {

  if (this.filterForm?.valid) {
    let filter: any = {};
    this.cSection?.filterFields.forEach(field => {
      let valorForm = this.filterForm?.controls[field.param].value;
      if (field.type === 'f') {
        if (valorForm instanceof Object) {
          filter[field.param] = this.singletonService.pad(valorForm.year, 4) + this.singletonService.pad(valorForm.month, 2) + this.singletonService.pad(valorForm.day, 2);
        } else {
          filter[field.param] = valorForm.toString().substr(6, 4) + valorForm.toString().substr(3, 2) + valorForm.toString().substr(0, 2);
        }
      } else {
        filter[field.param] = (valorForm === null || (field.type === 't' && valorForm.toString().replace(/\s/g, '') === '') || valorForm === undefined) ? field.value : valorForm;
      }


      
    });
                
    this.onFilter(filter, false);
    //this.sendFilter.emit(filter);
  }
}

  isInvalid(campo: any) {

  }

  loadGraficas() {
    this.viewGraficas = true;
  }
 
// CARGA DE DATOS
getDatatableData(url: string): void {
  console.log(url);
  this.mode = false;
  this.showMore = false;
  this.showAdvert = true;
  this.cSection.table.temp = [];
  this.cSection.table.selected = [];
  this.cSection.table.rows = [];
  this.selectedRow = this.cSection.table.selected[this.cSection.table.selected.length - 1];
  

  this.singletonService.getData(url).pipe(takeUntil(this.unsubsDatatable$)).subscribe(
    result => {
      this.cSection.table.temp = result;
      this.cSection.table.selected = [result[0]];
      this.cSection.table.rows = result;
      this.tabla._rows = result;
      this.tabla._internalRows = result;
      this.selectedRow = this.cSection.table.selected[this.cSection.table.selected.length - 1];
      console.log(result);
    },
    err => {
      console.log(err as any);
      this.showAdvert = false;
    },
    () => {
      this.showAdvert = false;
      this.tabla.offset = 0;
      this.tabla.bodyComponent.offsetX = 0;
      this.tabla.bodyComponent.offsetY = 0;
      this.tabla.bodyComponent.updateOffsetY(0);
    }
  );
}

  // CAMBIO DE INTERRUPTOR DE SELECCION
  changeMode(busquedaValue: any, comboValue: any) {
    this.mode = !this.mode;

    if (!this.mode) {
      
      this.cSection.table.selectionType = SelectionType.multi;
      
      this.cSection.table.rows = this.cSection.table.temp;
      this.tabla._internalRows = this.cSection.table.temp;

    } else {
      this.cSection.table.rows = this.cSection.table.selected
      this.cSection.table.selectionType = undefined;
    }

    if (busquedaValue !== '') {
      this.filtroBusqueda(busquedaValue, comboValue);
    }
    
  }


  // DETALLES DE LA DERECHA DE ABAJO Y DEL REGISTRO >
  showDetailData() {
    /*if (this.unsubsDetail$ !== undefined) {
      this.unsubsDetail$.next();
      this.unsubsDetail$.complete();
      console.log('unsubsDetail');
    }*/
    this.tabSend.emit(this.selectedRow);
    // Siempre showMore 
    this.showMore = true;
  
    // TABS DERECHA ABAJO


    // DETALLE REGISTRO

   
  
  
  }


  private groupBy(xs: any, key: any) {
    return xs.reduce(function(rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };



  // EVENTOS --------------------------------------------------------------------------------------------------------

  // CONTROL DE BUSQUEDA RAPIDA
  onSelectSearch(value: any): void {
    this.busqueda.nativeElement.value = '';
    if (value !== 'empty') {
      this.isSelectedSearch = true;
      this.busqueda.nativeElement.disabled = false;
      this.busqueda.nativeElement.focus();
    } else {
      this.isSelectedSearch = false;
    }
  }
  // CONTROL CAMBIO DE DETALLE
  changeDetalle() {
    this.isShowingDetalle = !this.isShowingDetalle;
    if (!this.isShowingDetalle) {
      this.tablaWidth = 'calc(100% - 0.4rem - 8px)';
    } else {
      this.tablaWidth = '69.4%';
    }
    if (this.cSection.table.rows !== []) {
      this.cSection.table.rows = [...this.cSection.table.rows];
    }
  }

  // CONTROL DE FILTRADO
  onFilter(filter: any, refresh: boolean): void {
    // refresh es true cuando se da al botón refrescar y false en el caso de dar a filtrar o cuando se inicializa la pagina
    console.log('onFilter');
    this.filter = filter;
    this.getDatatableData(this.cSection.controller + '/filtrar/' + this.objectToUrlParams(this.filter));
    this.changeFiltrado(refresh);
  }

  changeFiltrado(r: boolean) {
    
    if (!this.cargarFiltrado) { this.cargarFiltrado = true; }

    if (!this.mostrarFiltrado) {
      if (this.mode) {
        this.changeMode('', '');
      }

    }
    
    if (r) {
      this.mostrarFiltrado = false;
    } else {
      this.mostrarFiltrado = !this.mostrarFiltrado;
    }

    if (this.mostrarFiltrado) {
      this.busqueda.nativeElement.disabled = 'disabled';
    }

    this.combo.nativeElement.value = 'empty';
    this.busqueda.nativeElement.value = '';
    this.tabla.recalculateDims();

    if (this.cSection.table.rows !== []) {
      this.cSection.table.rows = this.tabla._internalRows;
    }
  }

  onSubmitGraficas(event: any) {
    /*if (event) { 
      if (event[1] === 'create') {
        this.tabla.rows.unshift(event[0]);
        this.selectedRow = event[0];
        this.tabla.selected = [event[0]];
      } else {
        let index = this.tabla.bodyComponent.getRowIndex(this.selectedRow);
        
        this.tabla.rows[index] = event[0];
        this.selectedRow = event[0];
        this.tabla.selected = [event[0]];
      }
      this.tabla.rows = [...this.tabla.rows];
    }*/
    this.viewGraficas = false;
    
  }


    
// CONTROL DE REGISTROS NAVEGADOR
changeRegister(action: string) {
  this.cSection.table.rows = this.tabla._internalRows;
  const SELECCIONADO = this.tabla.bodyComponent.getRowIndex(this.cSection.table.selected[0]);

  switch (action) {
    case 'first':
      this.cSection.table.selected = [this.cSection.table.rows[0]];
      this.tabla.bodyComponent.updateOffsetY(0);
      break;
    case 'previous':
      this.cSection.table.selected = [this.cSection.table.rows[SELECCIONADO !== 0 ? SELECCIONADO - 1 : 0]];
      break;
    case 'next':
      const LIMIT = this.tabla.bodyComponent._rowCount - 1;
      this.cSection.table.selected = [this.cSection.table.rows[SELECCIONADO !== LIMIT ? SELECCIONADO + 1 : LIMIT]];
      break;
    case 'last':
      this.cSection.table.selected = [this.cSection.table.rows[this.tabla.bodyComponent._rowCount - 1]];
      this.tabla.bodyComponent.updateOffsetY(Math.ceil(this.tabla.rowCount / this.tabla.pageSize) - 1);
      break;
  }
  this.showMore = false;
}

onSelect({ selected }: any) {
  this.showMore = false;
  this.cSection.table.selected.splice(0, this.cSection.table.selected.length);
  this.cSection.table.selected.push(...selected);
  console.log(this.cSection.table.selected);
  this.selectedRow = this.cSection.table.selected[this.cSection.table.selected.length - 1];
}



onSort() {
  if (this.anyExpandedRow) {
    this.tabla.rowDetail.collapseAllRows();
  }
}

onSel(rowIndex: any) {
  
}

onFocus() {
    console.log('focus');
    }

onActivate(event: any) {
      // console.log('onActivate');
}


@HostListener('mousemove', ['$event'])
onMouseMove(event: MouseEvent | any): void {
  if (this.isResizing && this.isShowingDetalle && this.initialHolderPosition && this.initialTableWidthPx) {
    const TABLA_WIDTH_PX = this.initialTableWidthPx + event.clientX - this.initialHolderPosition;
    const SECTION_CONTENT_WIDTH_PX = this.sectionContent.nativeElement.clientWidth;

    if (TABLA_WIDTH_PX > SECTION_CONTENT_WIDTH_PX * 0.25 && TABLA_WIDTH_PX < SECTION_CONTENT_WIDTH_PX * 0.85) {
      this.tablaWidth = TABLA_WIDTH_PX + 'px';
      if (this.cSection.table.rows !== []) {
        this.cSection.table.rows = [...this.cSection.table.rows];
      }
    }
  }
}

@HostListener('window:keyup', ['$event'])
keyEvent(event: KeyboardEvent): void {
  if (!this.showAdvert) {
    if (this.viewRow && event.key === 'Escape') {
      this.viewRow = false;
    }

    /*if (!this.viewRow && event.key === 'Enter') {
      this.loadCrud('read');
    }*/

    if (this.modal && event.key === 'Escape') {
      this.modal = false;
    }
  }
}

holderClick(event: MouseEvent): void {
this.tabla.rowDetail.collapseAllRows();
  this.initialHolderPosition = event.clientX;
  this.initialTableWidthPx = this.table.nativeElement.clientWidth;
  console.log(this.initialHolderPosition);
  this.isResizing = true;
}

@HostListener('mouseup')
onMouseup(): void {
    this.isResizing = false;
}

 // TOGGLE 
pp(){
  console.log(this.cSection.table.rows, this.tabla._internalRows);
}

noop() { return null; }

toggleExpandRow(row: JSON, expanded: boolean, event?: any) {
  console.log(event);  
 //  this.messageEvent.emit(this.message);
    
  if (!expanded) { // ABRO

    if (this.anyExpandedRow && !this.pageWithExpanded) {
        this.tabla.rowDetail.collapseAllRows();
        this.tabla.rowDetail.toggleExpandRow(row);
    } else if (this.anyExpandedRow && this.pageWithExpanded) {
        console.log('entraexp')
        this.tabla.rowDetail.collapseAllRows();
        this.tabla.bodyComponent.updateOffsetY(Math.ceil(this.tabla.bodyComponent.getRowIndex(this.expandedRow) / this.tabla.pageSize) - 1);
        setTimeout(()=> {this.tabla.rowDetail.toggleExpandRow(row)}, 2000);

        
    } else {
      this.tabla.rowDetail.toggleExpandRow(row);
    }
    console.log('abierto sdfsdfsfs');

   // this.showDetailData(row);
   this.rowSend.emit(row);
    this.anyExpandedRow = true;

    this.expandedRow = row;

    console.log(row);
    //this.tabla.rowDetail.toggleExpandRow(row);


  } else { // CIERRO
    console.log('cerrado');
    this.anyExpandedRow = false;
    this.expandedRow = undefined;
    this.tabla.rowDetail.toggleExpandRow(row);
  }

  
  
  this.pageWithExpanded = false;
}



showDetailRegister(data:any)
{


}
showDetailTabs(data:any)
{


}


onPage() {
  this.pageWithExpanded = false; //(this.anyExpandedRow)
  this.tabla.rowDetail.collapseAllRows();
}

onResize(event: any) {
  this.tabla.rowDetail.collapseAllRows();
}


changeModal(): void {
  this.modal = !this.modal;
}
   // METODOS  -----------------------------------------------------------------------------------------

   // CONVERSORES DE OBJETO A PARAMETROS
   objectToUrlParams2(obj: any): string {
    let str = '';
    // tslint:disable-next-line:forin
    for (const key in obj) {
      if (str !== '') {
          str += '&';
      }

      str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
  }
  objectToUrlParams(obj: any): string {
    let str = '';
    // tslint:disable-next-line:forin
    for (const key in obj) {
      str += encodeURIComponent(obj[key]) + '/';
    }
    return str;
  }

// METODOS PARA LA BUSQUEDA RAPIDA
searchPlaceholder(selectValue: string): string {
  let result = '';

  if (selectValue === 'empty') {
    result = '<-- Texto a buscar ';
  } else {
    result = 'Introduzca ' + selectValue.split(',')[1] + '...';
  }

  return result;
}

filtroBusqueda(event: any, selectValue: string) {
  selectValue = selectValue.split(',')[0];
  console.log(event);
  const VAL = event.toLowerCase();
  console.log('ej:', this.mode, this.cSection.table.temp[1]);
  const TABLE = this.mode ? this.cSection.table.selected : this.cSection.table.temp;
  const TEMP = TABLE.filter((d: any) => {
  return d[selectValue] == undefined || d[selectValue].toString().toLowerCase().indexOf(VAL) !== -1 || !VAL;
  });
  this.cSection.table.rows = TEMP;
  console.log(this.cSection.table.rows);  
}

 // FIJAR COLUMNAS
isPinned(column: Column): string {
  let result = 'pinnedOff';
  
  if (column.frozenLeft) {
    result = 'pinnedLeft';
  } else if (column.frozenRight) {
    result = 'pinnedRight';
  }

  return result;
}

changePinned(column: Column, value: string): void {
  switch (value) {
    case 'pinnedLeft':
      column.frozenLeft = true;
      column.frozenRight = false;
      break;
    case 'pinnedRight':
      column.frozenLeft = false;
      column.frozenRight = true;
      break;
    case 'pinnedOff':
    default:
      column.frozenLeft = false;
      column.frozenRight = false;
      break;
  }

  console.log({id: 'pruebaColumn', column: column, value: value});
}



generateExcel() {
  const A: any[][] = [[]];
  this.cSection.table.columns.forEach((c: any) => {
    if (c.visible) {
      A[0].push(c.name);
    }
  });
  this.tabla._internalRows.forEach( (fila, i) => {
    let j = 0;
    A[i+1] = [];
    for (let k = 0; k < this.cSection.table.columns.length; k++) {
      const COLUMNA = this.cSection.table.columns[k];
      console.log(COLUMNA.name);
      if (COLUMNA.visible) {
        const PIPE = COLUMNA.pipe;
        if (PIPE !== undefined) {
          A[i + 1].push(PIPE.transform(fila[COLUMNA.prop]));
        } else {
          A[i + 1].push(fila[COLUMNA.prop]);
        }
      }      
    }
  });


    // tslint:disable-next-line:forin
    /*for (const clave in fila) {
      const COLUMNA = this.cSection.table.columns[j];

      console.log(clave);
      console.log(COLUMNA.name);
      console.log(j);

      if (COLUMNA.visible===true) {
        const PIPE = COLUMNA.pipe;
        if (PIPE !== undefined) {
          A[i + 1].push(PIPE.transform(fila[COLUMNA.prop]));
        } else {
          A[i + 1].push(fila[COLUMNA.prop]);
        }
      }

      j++;
    }*/


 // console.log(A);

  const WS: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(A);
  const WB: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(WB, WS, 'ExportacionTabla');
  XLSX.writeFile(WB, 'ExportacionTabla.xlsx');
}

toggle(column: any) {
  column.visible = !column.visible;
}

generatePdfbk(vista: any) {
  console.log('pdf');
  const A: any[][] = [[]];
  this.cSection.table.columns.forEach((c: any) => {
    if (c.visible) {
      A[0].push(c.name);
      console.log(A[0]);
    }
  });

  this.tabla._internalRows.forEach( (fila, i) => {
    let j = 0;
    A[i+1] = [];
    for (let k = 0; k < this.cSection.table.columns.length; k++) {
      const COLUMNA = this.cSection.table.columns[k];
      console.log(COLUMNA.name);
      if (COLUMNA.visible) {
        const PIPE = COLUMNA.pipe;
        if (PIPE !== undefined) {
          A[i + 1].push(PIPE.transform(fila[COLUMNA.prop]));
        } else {
          A[i + 1].push(fila[COLUMNA.prop]);
        }
      }      
    }
  });

  const docDefinition = {
    pageOrientation: 'landscape',
    content: [
     {
      style: 'header',
      text: 'Listado de registros ' + this.cSection.title
     },
     {
        table: {
                style: 'headertable',
                headerRows: 1,
                body: A
        },
        layout: {
                  fillColor(rowIndex: any, node: any, columnIndex: any) {
                    return (rowIndex === 0 ? '#DDDDDD' : (rowIndex % 2 === 0) ? '#CCCCCC' : null);
                  }
        }
      }
    ],
    styles: {
        header: {
          fontSize: 24,
          aligment: 'center',
          bold: true,
          margin: [0, 0, 0, 10],
          color: '#AABB'
        },
        headertable: {
          margin: [0, 5, 0, 15],
          bold: true,
          color: '#DDEE'
        },
        tablita: {
          margin: [0, 5, 0, 15],
          color: 'black'
        }
    }
  }; // end docDefinition

    // download the PDF
  // this.pdfmake.create(docDefinition as any).download();
  if (vista === 1) {
  /*  this.pdfmake.create();
    this.pdfmake.documentDefinition = docDefinition;

    this.pdfmake.open(); 
    this.pdfmake.download();
  } else {
    this.pdfmake.print();*/
  }
}

generatePdf(vista: any) {
  const headers = [
    {  header: 'Id', dataKey: 'id' },
    {  header: 'Nombre', dataKey: 'nombre'}
  ];
  const data = [
      { id: 1, nombre: 'Alexander Arnold' },
      { id: 2, nombre: 'Mariela Lopez' }
  ];
  this.exportPDF(data, headers, "usuarios.pdf", "Usuarios");


}

 

exportPDF(data: any[], headers: IExportHeaders[] = [], filename = "file", headerTitle = "Documento eFact") { 
  const getDefaultHeaders = (json: any) => {
    const defaultHeaders = [];
    const keysObj = Object.keys(json);
    for (let value of keysObj) {
        const tempObj = {
            header: value, dataKey: value
        };
        defaultHeaders.push(tempObj)
    }
    return defaultHeaders;
  }
  const PDFConfig: jsPDFOptions = { putOnlyUsedFonts: true, orientation: 'landscape' };

  if (data.length === 0) {
    return console.log('No hay datos disponibles para exportar');
  }

  if (!headers || headers.length == 0) {
    headers = getDefaultHeaders(data[0]);
  }

  console.log('Generando su documento PDF...');

  const doc = new jsPDF(PDFConfig);
  doc.setFontSize(18);
  doc.text(headerTitle, 14, 14);
  doc.setFontSize(8);
  const objColumns: any = {};
  for (const header of headers) {
      objColumns[header.dataKey] = { columnWidth: 'auto' }
  }

 
  autoTable(doc, {
    columns: headers,
    body: data,
    startY: 20,
    columnStyles: objColumns,
    theme: 'striped',
    tableWidth: 'auto',   
    showHead: 'firstPage',    
    headStyles: {
        fillColor: [52, 152, 219]
    },
    styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        fontSize: 8,
        cellPadding: 2
    }
  });
 // doc.save('table.pdf');

  const pageNumber = doc.internal.pages.length-1;
  const pageSize = doc.internal.pageSize;
  const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

  function addFooters() {
    for (let i = 0; i < pageNumber; i++) {
        doc.text(`Pagina ${i + 1} de ·${pageNumber}`, 14, pageHeight - 10);
    }
  }
  addFooters();
  console.log("prueba");
  doc.setPage(pageNumber);
  doc.save(`${filename}`); 

}




private cleanMemory() {
  if (this.unsubsDatatable$ !== undefined) {
    this.unsubsDatatable$.next();
    this.unsubsDatatable$.complete();
    console.log('unsubsDatatable');
  }
  if (this.unsubsDetail$ !== undefined) {
    this.unsubsDetail$.next();
    this.unsubsDetail$.complete();
    console.log('unsubsDetail');
  } 
}

ngOnDestroy() {
  this.cleanMemory();
}




}
