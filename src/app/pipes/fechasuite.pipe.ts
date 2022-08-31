import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechasuite'
})
export class FechaSuitePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    let result: string;
    if (value === null || value ==='') {
      return '';
    }
    var fecha = new String(value).valueOf();
    fecha= fecha.substr(0, 10);

    if ( fecha === undefined || fecha === null || fecha === '9999-12-31') {
      result = '[Sin fecha]';
    } else if (fecha === '[Sin fecha]') {
      result = '';
    } else {
      const VS = fecha.toString();
      
       result = VS.substr(8, 2) + '/' + VS.substr(5, 2) + '/' + VS.substr(0, 4);
    }
    return result;
  }

}
