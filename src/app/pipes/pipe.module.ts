import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BigEqualizerPipe } from './BigEqualizer/big-equalizer.pipe';
import { LibraryPipe } from "./library/library.pipe";
import { SanitizeUrlPipe } from "./Sanitizers/sanitize-html.pipe";
import { TimePipe } from './time/time.pipe';
import { TranslatePipe } from "./translate/translate.pipe";

@NgModule({
  declarations: [
    TranslatePipe,
    LibraryPipe,
    BigEqualizerPipe,
    SanitizeUrlPipe,
    TimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe, LibraryPipe, BigEqualizerPipe, SanitizeUrlPipe, TimePipe]
})
export class PipeModule { }
