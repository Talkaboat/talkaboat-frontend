import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceBuyComponent } from './marketplace-buy/marketplace-buy.component';
import { MarketplaceSellComponent } from './marketplace-sell/marketplace-sell.component';
import { MarketplacePreviewListComponent } from './marketplace-buy/marketplace-preview-list/marketplace-preview-list.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    MarketplaceBuyComponent,
    MarketplaceSellComponent,
    MarketplacePreviewListComponent,
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ], exports: [MarketplaceComponent]
})
export class MarketplaceModule { }
