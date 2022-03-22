import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacenterComponent } from './mediacenter.component';

describe('MediacenterComponent', () => {
  let component: MediacenterComponent;
  let fixture: ComponentFixture<MediacenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediacenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediacenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
