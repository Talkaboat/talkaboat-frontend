import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { MediaHelperService } from './media-helper.service';


describe('MediaHelperService', () => {
  let service: MediaHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot({
        preventDuplicates: true,
        positionClass: 'toast-top-right',
        timeOut: 2500,
        progressBar: true,
        progressAnimation: 'increasing'
      }),]
    });
    service = TestBed.inject(MediaHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
