import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routing-components/home/home.component';
import { LoginComponent } from './routing-components/login/login.component';
import { RegisterComponent } from './routing-components/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,  data: { animation: "home"} },
  { path: 'login', component: LoginComponent, data: { animation: "isRight"} },
  { path: 'register', component: RegisterComponent, data: { animation: 'isBottom' } },
  { path: 'search', loadChildren: () => import('./routing-components/search/search.module').then(m => m.SearchModule) },
  { path: '**', component: HomeComponent, data: { animation: "home"} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      relativeLinkResolution: 'legacy'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
