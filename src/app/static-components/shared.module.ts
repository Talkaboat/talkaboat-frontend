import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DirectivesModule } from "../directives/directives.module";
import { PipeModule } from "../pipes/pipe.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ProfileSidebarComponent } from "./header/profile-sidebar/profile-sidebar.component";
import { FilterComponent } from './header/search-slot/filter/filter.component';
import { SearchSlotComponent } from "./header/search-slot/search-slot.component";
import { LoadingAnimationComponent } from "./loading/loading-animation/loading-animation.component";
import { LoadingComponent } from "./loading/loading.component";
import { MediaPlayerComponent } from "./media-player/media-player.component";
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';
import { PodcastCarouselComponent } from './podcast-carousel/podcast-carousel.component';
import { PodcastListViewItemComponent } from "./podcast/podcast-list/podcast-list-view-item/podcast-list-view-item.component";
import { PodcastListComponent } from './podcast/podcast-list/podcast-list.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { YoutubeComponent } from './youtube/youtube.component';


@NgModule({
  declarations: [
    ProfileSidebarComponent,
    SearchSlotComponent,
    HeaderComponent,
    LoadingAnimationComponent,
    LoadingComponent,
    MediaPlayerComponent,
    SidebarComponent,
    FooterComponent,
    FilterComponent,
    YoutubeComponent,
    PodcastListViewItemComponent,
    PodcastListComponent,
    PodcastCarouselComponent,
    PlaylistAddComponent,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DirectivesModule,
    NgMultiSelectDropDownModule.forRoot(),
    PipeModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    CarouselModule
  ],
  exports: [
    ProfileSidebarComponent,
    SearchSlotComponent,
    HeaderComponent,
    LoadingAnimationComponent,
    LoadingComponent,
    MediaPlayerComponent,
    SidebarComponent,
    FooterComponent,
    YoutubeComponent,
    PodcastListViewItemComponent,
    PodcastListComponent,
    PodcastCarouselComponent,
    PlaylistAddComponent
  ],
})
export class SharedModule { }
