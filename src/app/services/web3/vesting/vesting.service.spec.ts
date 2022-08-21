import { TestBed } from '@angular/core/testing';

import { VestingService } from './vesting.service';

describe('VestingService', () => {
  let service: VestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
