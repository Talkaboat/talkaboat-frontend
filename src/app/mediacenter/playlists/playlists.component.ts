import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscription! : Subscription;

  constructor(private podcastService : PodcastRepositoryService) {}

  ngOnInit(): void {
    this.playlistSubscription = this.podcastService.getPlaylists().subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }



}
