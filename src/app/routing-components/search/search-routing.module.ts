import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { SearchComponent } from './search.component';

const searchRoutes: Routes = [
  {
    path: '', component: SearchComponent
  },
  { path: 'podcast', component: PodcastDetailComponent },
  { path: 'podcast/episode', component: EpisodeDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ], exports: [ RouterModule ]
})
export class SearchRoutingModule { }
