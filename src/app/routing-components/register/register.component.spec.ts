import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from 'src/app/services/i18n/translate.pipe';
import { UserService } from 'src/app/services/user/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['register', 'onUserStateChanged']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent, TranslatePipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ { provides: UserService, useValue: userService}, FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
