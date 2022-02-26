import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['register', 'onUserStateChanged']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, TranslatePipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ],
      providers: [ { provides: UserService, useValue: userService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
