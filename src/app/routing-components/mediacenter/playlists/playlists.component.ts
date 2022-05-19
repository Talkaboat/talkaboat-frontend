import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';

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

  constructor(private podcastService : PodcastRepositoryService, private readonly userService: UserService, private readonly mediaPlayer: MediaPlayerService) {
    // this.recommendationPlaylists = PLAYLIST_ARRAY_MOCK;
  }

  ngOnInit(): void {
    this.loggedIn = this.userService.isUserLoggedIn();
    this.userService.onUserStateChanged.subscribe(state => {
      this.loggedIn = state;
      this.getPlaylist();
    });
    this.getPlaylist();

  }

  getPlaylist() {
    this.userPlaylists = [];
    this.fetchedUserPlaylists = false;
    if (!this.loggedIn) {
      return;
    }
    this.playlistSubscription = this.podcastService.getPlaylists().subscribe((data) => {
      this.fetchedUserPlaylists = true;
      this.userPlaylists = data;
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }

  handlePlayPlaylist(playlist : Playlist) : void {
    if (playlist.tracks && playlist.tracks.length > 0) {
      this.mediaPlayer.SetPlaylist(playlist, true);
    }
  }

  handleViewPlaylist(playlist : Playlist) : void {
    // TODO ACTUALLY VIEW PLAYLIST
  }
}
