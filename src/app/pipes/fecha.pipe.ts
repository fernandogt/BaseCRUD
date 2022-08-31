import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result: string;

    if (value === 0 || value === undefined || value === null || value === 99991231) {
      result = '[Sin fecha]';
    } else if (value === '[Sin fecha]') {
      result = '';
    } else {
      const VS = value.toString();
      result = VS.substr(6, 2) + '/' + VS.substr(4, 2) + '/' + VS.substr(0, 4);
    }
    return result;
  }

}
