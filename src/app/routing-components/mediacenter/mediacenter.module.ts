import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediacenterRoutingModule } from './mediacenter-routing.module';
import { MediacenterComponent } from './mediacenter.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MediacenterComponent
  ],
  imports: [
    CommonModule,
    MediacenterRoutingModule,
    RouterModule
  ],
  exports: [MediacenterComponent]
})
export class MediacenterModule { }
