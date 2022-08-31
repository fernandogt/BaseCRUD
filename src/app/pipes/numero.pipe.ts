import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export class NumeroPipe {
  private cad;
  constructor(s: string) {
    this.cad = s;
  }

  transform(value: any, ...args: any[]): any {
    let p = new DecimalPipe('es');
    let v: string;

    if (value === undefined ||  value === null) {
      v = '';
    } else if (isNaN(value)) {
      v = value;
    } else {
      v = p.transform(value, this.cad) || '';
    }
    return v;
  }

}
