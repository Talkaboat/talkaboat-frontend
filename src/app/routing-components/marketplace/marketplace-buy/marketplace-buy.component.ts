import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './marketplace-buy.component.html',
  styleUrls: ['./marketplace-buy.component.scss']
})
export class MarketplaceBuyComponent implements OnInit {

  selectedTab = 0;
  isBidAllowed = true;
  isDirectAllowed = true;
  items = [{
    title: "Let's Talkaboat Episode",
    seller: "Talkaboat",
    sellerUrl: "search/podcast",
    sellerParams: {pd: 764003},
    description: "To promote our podcast we sell our next episode's income rights",
    price: "20 USDT",
    orderType: "direct",
    buyType: "buy"
  }, {
    title: "Crypto Podcast",
    seller: "Max Mustermann",
    sellerUrl: "",
    description: "We sell our podcast income right on subscription basis to raise funds for initial promotion and production",
    price: "20",
    priceCurrency: "USDT",
    orderType: "bid",
    buyType: "subscribe"
  }, {
    title: "Let's Talkaboat Podcast",
    seller: "Talkaboat",
    sellerUrl: "search/podcast?pd=764003",
    description: "We sell all rights of our podcast",
    price: "150 USDT",
    orderType: "bid",
    buyType: "buy"
  }];

  filteredItems: any = [];
  constructor() { }

  ngOnInit(): void {
    this.fillFilteredItems(this.items);

  }

  fillFilteredItems(newItems: any[]) {
    this.filteredItems = [];
    newItems.forEach(item => this.filteredItems.push(item));
  }

  selectTab(index: number) {
    this.selectedTab = index;
    if(this.selectedTab == 0) {
      this.fillFilteredItems(this.items);
    } else if(this.selectedTab == 1) {
      const newFilterItems = this.items.filter(item => item.buyType.includes("buy")
      && ((!this.isBidAllowed || item.orderType.includes('bid'))
      || (!this.isBidAllowed || item.orderType.includes('direct'))));
      this.fillFilteredItems(newFilterItems);
    } else {
      this.fillFilteredItems(this.items.filter(item => item.buyType.includes("subscribe")
      && ((!this.isBidAllowed || item.orderType.includes('bid'))
      || (!this.isBidAllowed || item.orderType.includes('direct')))));
    }
  }

}
