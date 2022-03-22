import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediacenterComponent } from './mediacenter.component';

const routes: Routes = [
{ path: '', component: MediacenterComponent, redirectTo:'favourites' }, 
{ path: 'favourites', component: MediacenterComponent, loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesModule) }, 
{ path: 'playlists', component: MediacenterComponent, loadChildren: () => import('./playlists/playlists.module').then(m => m.PlaylistsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediacenterRoutingModule { }
