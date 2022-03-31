import { Component, Input, OnInit } from '@angular/core';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit {

  @Input()
  items! : Podcast[]

  constructor(private readonly podcastService : PodcastRepositoryService) { }

  ngOnInit(): void {
  }

  toggleLibraryHandler(clickedPodcast : Podcast) : void {
    console.log("user toggled:" + clickedPodcast.aboat_id);
    this.podcastService.getLibrary().subscribe((data) => {
      if (data.indexOf(clickedPodcast.aboat_id) == -1) {
          console.log("data did not contain this id - adding it");
          this.podcastService.addBookmark(clickedPodcast.aboat_id).subscribe((data) => {
            console.log("added successfully");
          });
      } else {
        console.log("data did contain this id - removing it");
        this.podcastService.removeBookmark(clickedPodcast.aboat_id).subscribe((data) => {
          console.log("removed successfully");
        });
      }
    });
  }
  
}
