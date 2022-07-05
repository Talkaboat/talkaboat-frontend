import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit {

  @Input()
  items! : Podcast[]

  @Output()
  removedFromLibrary : EventEmitter<Podcast> = new EventEmitter();

  @Output()
  addedToLibrary : EventEmitter<Podcast> = new EventEmitter();

  constructor(private readonly podcastService : PodcastRepositoryService) { }

  ngOnInit(): void {
  }

  toggleLibraryHandler(clickedPodcast : Podcast) : void {
    this.podcastService.getLibrary().subscribe((data) => {
      if (data.indexOf(clickedPodcast.podcastId) == -1) {
          this.podcastService.addBookmark(clickedPodcast.podcastId).subscribe((data) => {
            this.addedToLibrary.emit(clickedPodcast);
          });
      } else {
        this.podcastService.removeBookmark(clickedPodcast.podcastId).subscribe((data) => {
          this.removedFromLibrary.emit(clickedPodcast);
        });
      }
    });
  }
}
