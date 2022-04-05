import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module';
import { PipeModule } from '../../pipes/pipe.module';
import { SharedModule } from 'src/app/static-components/shared.module';
import { CreatorHomeComponent } from './creator-home/creator-home.component';
import { FanHomeComponent } from './fan-home/fan-home.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    HomeComponent,
    CreatorHomeComponent,
    FanHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PipeModule,
    SharedModule,
    DirectivesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
