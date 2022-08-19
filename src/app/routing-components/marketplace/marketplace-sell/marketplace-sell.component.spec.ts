import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceSellComponent } from './marketplace-sell.component';

describe('MarketplaceSellComponent', () => {
  let component: MarketplaceSellComponent;
  let fixture: ComponentFixture<MarketplaceSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
