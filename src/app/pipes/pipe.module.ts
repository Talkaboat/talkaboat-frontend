import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate/translate.pipe";
import { LibraryPipe } from "./library/library.pipe";
import { BigEqualizerPipe } from './BigEqualizer/big-equalizer.pipe';

@NgModule({
  declarations: [
    TranslatePipe,
    LibraryPipe,
    BigEqualizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe, LibraryPipe, BigEqualizerPipe]
})
export class PipeModule { }
