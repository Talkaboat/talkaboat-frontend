import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from './get-started/get-started.component';
import { HomeComponent } from './home.component';
import { IntroductionComponent } from './introduction/introduction.component';

const searchRoutes: Routes = [
  {
    path: '', component: HomeComponent

  },
  { path: 'intro', component: IntroductionComponent },
  { path: 'get-started', component: GetStartedComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ], exports: [ RouterModule ]
})
export class HomeRoutingModule { }
