import { TestBed } from '@angular/core/testing';

import { LoungeService } from './lounge.service';

describe('LoungeService', () => {
  let service: LoungeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoungeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
