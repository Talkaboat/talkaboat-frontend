import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PipeModule } from 'src/app/pipes/pipe.module';


@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistListComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    PipeModule
  ]
})
export class PlaylistsModule { }
