import { TestBed } from '@angular/core/testing';

import { BuybackService } from './buyback.service';

describe('BuybackService', () => {
  let service: BuybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuybackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
