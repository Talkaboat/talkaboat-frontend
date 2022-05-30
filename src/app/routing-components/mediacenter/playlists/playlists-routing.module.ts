import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';
import { PlaylistsComponent } from './playlists.component';

const routes: Routes = [
  { path: '', component: PlaylistsComponent },
  { path: ':pid', component: PlaylistEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
