import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { Web3Service } from './services/web3/web3.service';
import { WebsiteStateService } from './services/website-state/website-state.service';

describe('AppComponent', () => {

  let userService: jasmine.SpyObj<UserService>;
  let websiteStateServiceSpy: jasmine.SpyObj<WebsiteStateService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['autoConnect']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Web3Service, useValue: userService },
        WebsiteStateService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'talkaboat'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('talkaboat');
  });
});
