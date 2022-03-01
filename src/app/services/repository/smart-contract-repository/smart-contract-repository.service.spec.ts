import { TestBed } from '@angular/core/testing';

import { SmartContractRepositoryService } from './smart-contract-repository.service';

describe('SmartContractRepositoryService', () => {
  let service: SmartContractRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartContractRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
