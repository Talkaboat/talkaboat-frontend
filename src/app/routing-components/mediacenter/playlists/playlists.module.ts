import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';



@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistListComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlaylistsModule { }
