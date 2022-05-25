import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BigEqualizerPipe } from './BigEqualizer/big-equalizer.pipe';
import { IsPlaying } from "./is-playing/is-playing.pipe";
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
    TimePipe,
    IsPlaying
  ],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe, LibraryPipe, BigEqualizerPipe, SanitizeUrlPipe, TimePipe, IsPlaying]
})
export class PipeModule { }
