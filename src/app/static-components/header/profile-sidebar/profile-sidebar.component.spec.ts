import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/services/user/user.service';

import { ProfileSidebarComponent } from './profile-sidebar.component';

describe('ProfileSidebarComponent', () => {
  let component: ProfileSidebarComponent;
  let fixture: ComponentFixture<ProfileSidebarComponent>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['isUserKyced', 'resendMail']);
    await TestBed.configureTestingModule({
      declarations: [ProfileSidebarComponent],
      imports: [ HttpClientTestingModule ],
      providers: [ { provides: UserService, useValue: userService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
