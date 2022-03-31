import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { SharedModule } from 'src/app/static-components/shared.module';


@NgModule({
  declarations: [
    FavouritesComponent,
    FavouriteListComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule,
    SharedModule
  ]
})
export class FavouritesModule { }
