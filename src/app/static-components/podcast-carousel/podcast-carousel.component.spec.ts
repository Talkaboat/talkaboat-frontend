import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastCarouselComponent } from './podcast-carousel.component';


describe('CarouselComponent', () => {
  let component: PodcastCarouselComponent;
  let fixture: ComponentFixture<PodcastCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
