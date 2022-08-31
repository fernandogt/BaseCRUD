import { MinigridInterface } from 'src/app/helpers/minigrid/interfaces/minigrid.interface';
import { Table } from 'src/app/helpers/datatable/models/table';

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

