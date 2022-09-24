import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeListViewHeaderComponent } from './episode-list-view-header.component';

describe('EpisodeListViewHeaderComponent', () => {
  let component: EpisodeListViewHeaderComponent;
  let fixture: ComponentFixture<EpisodeListViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeListViewHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeListViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
