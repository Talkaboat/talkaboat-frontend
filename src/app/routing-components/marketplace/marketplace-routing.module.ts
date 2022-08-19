import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceBuyComponent } from './marketplace-buy/marketplace-buy.component';
import { MarketplaceSellComponent } from './marketplace-sell/marketplace-sell.component';
import { MarketplaceComponent } from './marketplace.component';

const routes: Routes = [
{ path: '', component: MarketplaceComponent},
{ path: 'buy', component: MarketplaceBuyComponent},
{ path: 'sell', component: MarketplaceSellComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
