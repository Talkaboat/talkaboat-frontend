import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsMetaDataComponent } from './comments-meta-data.component';

describe('CommentsMetaDataComponent', () => {
  let component: CommentsMetaDataComponent;
  let fixture: ComponentFixture<CommentsMetaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsMetaDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
