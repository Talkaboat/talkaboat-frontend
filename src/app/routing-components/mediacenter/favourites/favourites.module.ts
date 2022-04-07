import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { SharedModule } from 'src/app/static-components/shared.module';
import { PipeModule } from 'src/app/pipes/pipe.module';


@NgModule({
  declarations: [
    FavouritesComponent,
    FavouriteListComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule,
    SharedModule,
    PipeModule
  ]
})
export class FavouritesModule { }
