import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: UserService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, TranslatePipe],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        UserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    spyOn(userService.onUserStateChanged, 'subscribe');
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
