import { Pipe, PipeTransform } from '@angular/core';
import Big from 'big.js';

@Pipe({
  name: 'bigEqualizer'
})
export class BigEqualizerPipe implements PipeTransform {
  transform(value: Big, equals: number, equalized: string): boolean {
    if (value) {
      console.log(value);
      switch (equalized) {
        case 'eq': return value.eq(equals);
        case 'lt': return value.lt(equals);
        case 'lte': return value.lte(equals);
        case 'gt': return value.gt(equals);
        case 'gte': return value.gte(equals);
      }
    }
    return false;
  }

}
