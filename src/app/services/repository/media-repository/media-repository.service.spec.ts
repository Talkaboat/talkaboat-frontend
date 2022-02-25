import { TestBed } from '@angular/core/testing';

import { MediaRepositoryService } from './media-repository.service';

describe('MediaRepositoryService', () => {
  let service: MediaRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
