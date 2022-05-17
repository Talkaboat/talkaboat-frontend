import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from 'src/app/static-components/shared.module';
import { PipeModule } from '../../pipes/pipe.module';
import { CreatorHomeComponent } from './creator-home/creator-home.component';
import { FanHomeComponent } from './fan-home/fan-home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { GetStartedComponent } from './get-started/get-started.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreatorHomeComponent,
    FanHomeComponent,
    IntroductionComponent,
    GetStartedComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    PipeModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
