import { ContextMenuComponent } from './context-menu/context-menu.component';
import { DirectivesModule } from '../directives/directives.module';
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { PipeModule } from "../pipes/pipe.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ProfileSidebarComponent } from "./header/profile-sidebar/profile-sidebar.component";
import { FilterComponent } from './header/search-slot/filter/filter.component';
import { SearchSlotComponent } from "./header/search-slot/search-slot.component";
import { LoadingAnimationComponent } from "./loading/loading-animation/loading-animation.component";
import { LoadingComponent } from "./loading/loading.component";
import { MediaPlayerComponent } from "./media-player/media-player.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { YoutubeComponent } from './youtube/youtube.component';
<<<<<<< HEAD
import { ContextMenuContentComponent } from './context-menu/context-menu-content/context-menu-content.component';
=======
import { PodcastListViewItemComponent } from './podcast/podcast-list-view-item/podcast-list-view-item.component';
import { PodcastListComponent } from './podcast/podcast-list/podcast-list.component';
>>>>>>> 0884e06f23b9731dfa946e7bf6075ad007d22ac6

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
<<<<<<< HEAD
    ContextMenuComponent,
    ContextMenuContentComponent
=======
    PodcastListViewItemComponent,
    PodcastListComponent
>>>>>>> 0884e06f23b9731dfa946e7bf6075ad007d22ac6
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    PipeModule,
    DirectivesModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
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
<<<<<<< HEAD
    ContextMenuComponent
=======
    PodcastListViewItemComponent,
    PodcastListComponent
>>>>>>> 0884e06f23b9731dfa946e7bf6075ad007d22ac6
  ],
})
export class SharedModule { }
