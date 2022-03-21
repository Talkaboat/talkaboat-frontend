import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';


@NgModule({
  declarations: [
    FavouritesComponent,
    FavouriteListComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule
  ]
})
export class FavouritesModule { }
