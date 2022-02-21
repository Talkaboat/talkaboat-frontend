import { TestBed } from '@angular/core/testing';

import { MediaHelperService } from './media-helper.service';

describe('MediaService', () => {
  let service: MediaHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
