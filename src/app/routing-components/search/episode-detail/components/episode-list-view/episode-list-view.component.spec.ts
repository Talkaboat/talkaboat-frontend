import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeListViewComponent } from './episode-list-view.component';

describe('EpisodeListViewComponent', () => {
  let component: EpisodeListViewComponent;
  let fixture: ComponentFixture<EpisodeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
