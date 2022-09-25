import { TestBed } from '@angular/core/testing';

import { EpisodeDetailRepositoryService } from './episode-detail-repository.service';

describe('EpisodeDetailService', () => {
  let service: EpisodeDetailRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodeDetailRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
