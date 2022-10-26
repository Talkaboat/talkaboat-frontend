import { TestBed } from '@angular/core/testing';

import { RewardHubService } from './reward-hub.service';

describe('RewardHubService', () => {
  let service: RewardHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
