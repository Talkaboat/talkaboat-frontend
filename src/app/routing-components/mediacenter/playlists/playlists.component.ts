import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
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
  recommendationPlaylists: Playlist[] | null = null;
  playlistToDelete: Playlist | null = null;

  playlistName = new FormControl('', [Validators.required, Validators.maxLength(24)]);

  constructor(private podcastService : PodcastRepositoryService, private readonly userService: UserService, private readonly mediaPlayer: MediaPlayerService, private readonly translationService: TranslateService, private readonly toastrService: ToastrService, private readonly loadingService: LoaderService, private readonly mediaHelperService: MediaHelperService) {
    // this.recommendationPlaylists = PLAYLIST_ARRAY_MOCK;
  }

  ngOnInit(): void {
    this.loggedIn = this.userService.isUserLoggedIn();
    this.userService.onUserStateChanged.subscribe(state => {
      this.loggedIn = state;
      this.getPlaylists();
    });
    this.getPlaylists();

  }

  windowSize() {
    return window.innerWidth;
  }

  getPlaylists() {
    this.userPlaylists = [];
    this.fetchedUserPlaylists = false;
    if (!this.loggedIn) {
      return;
    }
    this.loadingService.show();
    this.playlistSubscription = this.podcastService.getPlaylists().subscribe({
      next: (data) => {
        this.fetchedUserPlaylists = true;
        this.userPlaylists = data;
        this.mediaHelperService.userPlaylists = this.userPlaylists;
        this.mediaHelperService.onPlaylistsChanged.emit(this.userPlaylists);
      },
      complete: () => {
        this.loadingService.hide();
      }
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

  handleViewPlaylist(playlist: Playlist): void {
    this.playlistToDelete = playlist;
    // TODO ACTUALLY VIEW PLAYLIST
  }

  handleDeletePlaylist(playlist: Playlist): void {
    this.playlistToDelete = playlist;
  }

  createPlaylist() {
    if (!this.playlistName.valid) {
      return;
    }
    this.loadingService.show();
    this.podcastService.addPlaylist(this.playlistName.value).subscribe({
      next: (_) => {
        this.toastrService.success(this.translationService.transform("success_create_playlist"));
      },
      error: (e) => {
        this.toastrService.error(this.translationService.transform("error_create_playlist"));
      },
      complete: () => {
        this.loadingService.hide();
        this.getPlaylists();
      }
    });
  }

  confirmDeletion() {
    this.loadingService.show();
    this.podcastService.deletePlaylist(this.playlistToDelete?.playlistId).subscribe({
      next: (_) => {
        this.toastrService.success(this.translationService.transform("success_delete_playlist"));
      },
      error: (e) => {
        this.toastrService.error(this.translationService.transform("error_delete_playlist"));
      },
      complete: () => {
        this.loadingService.hide();
        this.getPlaylists();
      }
    });
    this.playlistToDelete = null;
  }

  cancelDeletion() {
    if (this.playlistToDelete) {
      this.playlistToDelete = null;
      this.toastrService.info(this.translationService.transform("cancelled_deletion_playlist"));
    }
  }
}
