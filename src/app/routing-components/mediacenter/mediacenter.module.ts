import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediacenterRoutingModule } from './mediacenter-routing.module';
import { MediacenterComponent } from './mediacenter.component';


@NgModule({
  declarations: [
    MediacenterComponent
  ],
  imports: [
    CommonModule,
    MediacenterRoutingModule
  ],
  exports: [MediacenterComponent]
})
export class MediacenterModule { }
