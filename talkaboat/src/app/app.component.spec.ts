import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Web3Service } from './services/web3/web3.service';
import { WebsiteStateService } from './services/website-state/website-state.service';

describe('AppComponent', () => {

  let web3ServiceSpy: jasmine.SpyObj<Web3Service>;
  let websiteStateServiceSpy: jasmine.SpyObj<WebsiteStateService>;

  beforeEach(async () => {
    web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['reConnect']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Web3Service, useValue: web3ServiceSpy },
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
