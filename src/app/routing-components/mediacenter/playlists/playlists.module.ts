import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';



@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistListComponent,
    PlaylistEditComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class PlaylistsModule { }
