import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { SharedModule } from 'src/app/static-components/shared.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    SearchComponent,
    PodcastDetailComponent,
    EpisodeDetailComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    PipeModule
  ],  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SearchModule { }
