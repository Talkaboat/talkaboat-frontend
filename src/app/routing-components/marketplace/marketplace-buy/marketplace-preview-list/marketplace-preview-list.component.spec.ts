import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplacePreviewListComponent } from './marketplace-preview-list.component';

describe('MarketplacePreviewListComponent', () => {
  let component: MarketplacePreviewListComponent;
  let fixture: ComponentFixture<MarketplacePreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplacePreviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplacePreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
