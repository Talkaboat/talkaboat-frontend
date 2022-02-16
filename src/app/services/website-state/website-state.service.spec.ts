import { TestBed } from '@angular/core/testing';

import { WebsiteStateService } from './website-state.service';

describe('WebsiteStateService', () => {
  let service: WebsiteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
