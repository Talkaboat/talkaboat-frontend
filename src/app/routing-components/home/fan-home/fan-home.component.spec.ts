import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeModule } from 'src/app/pipes/pipe.module';

import { FanHomeComponent } from './fan-home.component';

describe('FanHomeComponent', () => {
  let component: FanHomeComponent;
  let fixture: ComponentFixture<FanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FanHomeComponent],
      imports: [ PipeModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
