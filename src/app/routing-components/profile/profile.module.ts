import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { InvestmentDashboardComponent } from './investment-dashboard/investment-dashboard.component';



@NgModule({
  declarations: [
    ProfileComponent,
    InvestmentDashboardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PipeModule,
    FormsModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
