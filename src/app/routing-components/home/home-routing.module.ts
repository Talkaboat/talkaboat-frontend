import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const searchRoutes: Routes = [
  {
    path: '', component: HomeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ], exports: [ RouterModule ]
})
export class HomeRoutingModule { }
