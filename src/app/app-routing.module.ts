import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routing-components/login/login.component';
import { RegisterComponent } from './routing-components/register/register.component';
export const routes: Routes = [
  { path: '', loadChildren: () => import('./routing-components/home/home.module').then(m => m.HomeModule),  data: { animation: "home"} },
  { path: 'login', component: LoginComponent, data: { animation: "isRight"} },
  { path: 'register', component: RegisterComponent, data: { animation: 'isBottom' } },
  { path: 'search', loadChildren: () => import('./routing-components/search/search.module').then(m => m.SearchModule) },
  { path: 'lounge', loadChildren: () => import('./routing-components/lounge/lounge.module').then(m => m.LoungeModule) },
  { path: 'info', loadChildren: () => import('./routing-components/info/info.module').then(m => m.InfoModule) },
  { path: '**', loadChildren: () => import('./routing-components/home/home.module').then(m => m.HomeModule),  data: { animation: "home"} }
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
