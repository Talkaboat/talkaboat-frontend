import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate/translate.pipe";
import { LibraryPipe } from "./library/library.pipe";

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
