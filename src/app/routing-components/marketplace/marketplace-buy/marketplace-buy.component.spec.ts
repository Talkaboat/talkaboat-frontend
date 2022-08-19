import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceBuyComponent } from './marketplace-buy.component';

describe('MarketplaceBuyComponent', () => {
  let component: MarketplaceBuyComponent;
  let fixture: ComponentFixture<MarketplaceBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
