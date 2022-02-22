import { Pipe, PipeTransform } from '@angular/core';
import { MediaHelperService } from '../media-helper.service';

@Pipe({
  name: 'library'
})
export class LibraryPipe implements PipeTransform {

  constructor(private readonly mediaService: MediaHelperService) {

  }

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
