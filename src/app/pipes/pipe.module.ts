import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../services/i18n/translate.pipe';
import { LibraryPipe } from '../services/media/library/library.pipe';

@NgModule({
  declarations: [
    TranslatePipe,
    LibraryPipe
  ],
  imports: [
    CommonModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    TranslatePipe, LibraryPipe
  ]
})
export class PipeModule { }
