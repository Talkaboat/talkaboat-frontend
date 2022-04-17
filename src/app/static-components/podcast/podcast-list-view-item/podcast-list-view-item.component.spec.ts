import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastListViewItemComponent } from './podcast-list-view-item.component';

describe('PodcastListViewItemComponent', () => {
  let component: PodcastListViewItemComponent;
  let fixture: ComponentFixture<PodcastListViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastListViewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastListViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
