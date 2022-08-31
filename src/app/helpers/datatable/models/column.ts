export class Column {

   constructor(
        public name: string,
        public prop: string,
        public flexGrow = 1,
        public minWidth = 100,
        public maxWidth = 200,
        public width = 150,
        public resizeable = true,
        // public comparator: any,
        public sortable = true,
        public draggable = true,
        public canAutoResize = true,
        public checkboxable = false,
        public headerCheckboxable = false,
        public headerClass: string | ((data: any) => string | any) = '',
        public cellClass: string | ((data: any) => string | any) = '',
        public frozenLeft = false,
        public frozenRight = false,
        public pipe: any,
        public summaryFunc: ((cells: any[]) => any) = a => a,
        public visible = false,
        public visibleDetail = visible
        /*
        cellTemplate: TemplateRef;
        headerTemplate: TemplateRef;
        isTreeColumn: boolean;
        treeLevelIndent: number;
        summaryFunc: (cells: any[]) => any;
        */
    ) {}
}
