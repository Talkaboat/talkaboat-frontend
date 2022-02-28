import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';



@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    PipeModule
  ],
  exports: [
    InfoComponent
  ]
})
export class InfoModule { }
