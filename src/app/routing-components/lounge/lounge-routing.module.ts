import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeComponent } from './lounge.component';

const routes: Routes = [
  { path: '', component: LoungeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoungeRoutingModule { }
