import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PipeModule } from "src/app/pipes/pipe.module";
import { SharedModule } from "src/app/static-components/shared.module";
import { EpisodeDetailComponent } from "./episode-detail/episode-detail.component";
import { PodcastDetailComponent } from "./podcast-detail/podcast-detail.component";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";

@NgModule({
  declarations: [
    SearchComponent,
    PodcastDetailComponent,
    EpisodeDetailComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    SharedModule,
    SearchRoutingModule
  ], exports: [
    SearchComponent,
    PodcastDetailComponent,
    EpisodeDetailComponent
  ],  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SearchModule { }
