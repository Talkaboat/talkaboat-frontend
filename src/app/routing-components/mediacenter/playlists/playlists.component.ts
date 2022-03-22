import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { PLAYLIST_ARRAY_MOCK } from 'src/constants/mocks/playlist.mock.constants';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscription! : Subscription;

  playlists : Playlist[] | null = null;

  constructor(private podcastService : PodcastRepositoryService) {}

  ngOnInit(): void {
    this.playlistSubscription = this.podcastService.getPlaylists().subscribe((data) => {
      console.log(data);
    }, (error) => {
      // local fallback playlist with recommendations?
      // mock for now
      console.error(error);
      this.playlists = PLAYLIST_ARRAY_MOCK;
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }
}
