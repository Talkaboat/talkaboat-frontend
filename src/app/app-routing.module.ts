import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeDetailComponent } from './routing-components/episode-detail/episode-detail.component';
import { HomeComponent } from './routing-components/home/home.component';
import { LoginComponent } from './routing-components/login/login.component';
import { PodcastDetailComponent } from './routing-components/podcast-detail/podcast-detail.component';
import { RegisterComponent } from './routing-components/register/register.component';
import { SearchComponent } from './routing-components/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,  data: { animation: "home"} },
  { path: 'login', component: LoginComponent, data: { animation: "isRight"} },
  { path: 'register', component: RegisterComponent, data: { animation: 'isBottom' } },
  { path: 'search', component: SearchComponent },
  { path: 'podcast', component: PodcastDetailComponent },
  { path: 'podcast/episode', component: EpisodeDetailComponent },


  { path: '**', component: HomeComponent, data: { animation: "home"} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
