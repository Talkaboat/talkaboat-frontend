import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'library'
})
export class LibraryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
