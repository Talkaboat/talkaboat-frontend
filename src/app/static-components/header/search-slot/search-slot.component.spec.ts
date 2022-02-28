import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeModule } from 'src/app/pipes/pipe.module';

import { SearchSlotComponent } from './search-slot.component';

describe('SearchSlotComponent', () => {
  let component: SearchSlotComponent;
  let fixture: ComponentFixture<SearchSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSlotComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, PipeModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
