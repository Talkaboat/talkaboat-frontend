import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PipeModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
