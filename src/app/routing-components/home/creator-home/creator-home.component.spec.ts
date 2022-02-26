import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeModule } from 'src/app/pipes/pipe.module';

import { CreatorHomeComponent } from './creator-home.component';

describe('CreatorHomeComponent', () => {
  let component: CreatorHomeComponent;
  let fixture: ComponentFixture<CreatorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorHomeComponent],
      imports: [ PipeModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
