import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenClaimComponent } from './token-claim.component';

describe('TokenClaimComponent', () => {
  let component: TokenClaimComponent;
  let fixture: ComponentFixture<TokenClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
