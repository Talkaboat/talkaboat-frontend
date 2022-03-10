import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { MediaRepositoryService } from './media-repository.service';


describe('MediaRepositoryService', () => {
  let service: MediaRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ]
    });
    service = TestBed.inject(MediaRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
