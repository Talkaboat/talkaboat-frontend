import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routing-components/home/home.component';
import { LoginComponent } from './routing-components/login/login.component';
import { RegisterComponent } from './routing-components/register/register.component';
import { SearchComponent } from './routing-components/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,  data: { animation: "home"} },
  { path: 'login', component: LoginComponent, data: { animation: "isRight"} },
  { path: 'register', component: RegisterComponent, data: { animation: 'isBottom' } },
  { path: 'search', component: SearchComponent },


  { path: '**', component: HomeComponent, data: { animation: "home"} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
