import { TestBed } from '@angular/core/testing';

import { InvestmentRepositoryService } from './investment-repository.service';

describe('InvestmentRepositoryService', () => {
  let service: InvestmentRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
