import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeListItemComponent } from './episode-list-item.component';

describe('EpisodeListItemComponent', () => {
  let component: EpisodeListItemComponent;
  let fixture: ComponentFixture<EpisodeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
