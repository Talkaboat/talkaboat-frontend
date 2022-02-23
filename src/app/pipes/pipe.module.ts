import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslatePipe } from "../services/i18n/translate.pipe";
import { LibraryPipe } from "../services/media/library/library.pipe";

@NgModule({
  declarations: [
    TranslatePipe,
    LibraryPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe, LibraryPipe]
})
export class PipeModule { }
