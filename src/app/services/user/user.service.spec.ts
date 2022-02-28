import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryService: jasmine.SpyObj<UserRepositoryService>;
  beforeEach(() => {
    userRepositoryService = jasmine.createSpyObj('UserRepositoryService', ['register', 'login', 'requestLogin', 'confirm', 'getProfile']);
    TestBed.configureTestingModule({

      imports: [ HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule ],
      providers: [ { provides: UserRepositoryService, useValue: userRepositoryService} ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
