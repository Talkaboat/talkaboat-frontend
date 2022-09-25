import { TestBed } from '@angular/core/testing';

import { EpisodeDetailService } from './episode-detail.service';

describe('EpisodeDetailService', () => {
  let service: EpisodeDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodeDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
