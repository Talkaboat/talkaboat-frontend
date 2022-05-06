import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentDashboardComponent } from './investment-dashboard/investment-dashboard.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent
  }, {
    path: 'invest', component: InvestmentDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
