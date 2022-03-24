import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { PLAYLIST_ARRAY_MOCK } from 'src/constants/mocks/playlist.mock.constants';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscription! : Subscription;
  loggedIn : boolean | null = null;
  fetchedUserPlaylists: boolean | null = null;
  userPlaylists : Playlist[] | null = null;
  recommendationPlaylists : Playlist[] | null = null;
  
  constructor(private podcastService : PodcastRepositoryService, private readonly userService: UserService) {
    this.recommendationPlaylists = PLAYLIST_ARRAY_MOCK;
  }

  ngOnInit(): void {
    this.loggedIn = this.userService.isUserLoggedIn();
    this.playlistSubscription = this.podcastService.getPlaylists().subscribe((data) => {
      this.fetchedUserPlaylists = true;
      if (data.length > 0) {
        this.userPlaylists = data;
      }
    }, (error) => {
      console.error(error);
      this.fetchedUserPlaylists = false;
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }
}
