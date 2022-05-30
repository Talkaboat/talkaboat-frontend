import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { PlaylistTrack } from 'src/app/services/repository/search-repository/models/playlist/playlist-track.model.dto';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';

@Component({
  selector: 'app-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.scss']
})
export class PlaylistEditComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  private playlistId: number = -1;
  public playlist: Playlist | null = null;
  public trackToDelete: PlaylistTrack | null = null;
  constructor(private readonly route: ActivatedRoute,
    private readonly podcastRepositoryService: PodcastRepositoryService,
  private readonly mediaPlayerService: MediaPlayerService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.playlistId = params['pid'];
      this.getPlaylist();
    }));
  }

  getPlaylist() {
    this.podcastRepositoryService.getPlaylist(this.playlistId).subscribe(playlist => {
      this.playlist = playlist;
      this.sortPlaylist();
    });
  }

  sortPlaylist() {
    if (this.playlist && this.playlist.tracks) {
      this.playlist.tracks = this.playlist.tracks?.sort((a, b) => a.position - b.position);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }

  play(track: PlaylistTrack) {
    if (!track || !this.playlist) {
      return;
    }
    this.mediaPlayerService.SetPlaylist(this.playlist, true, track.position);
  }

  delete(track: PlaylistTrack) {
    this.trackToDelete = track;
  }

  cancelDeletion() {
    this.trackToDelete = null;
  }

  confirmDeletion() {
    if (this.trackToDelete) {
      this.podcastRepositoryService.removeEpisodeFromPlaylist(this.playlistId, this.trackToDelete.playlistTrack_Id).subscribe((playlist: Playlist) => {
        this.playlist = playlist;
        this.sortPlaylist();
      })
      this.trackToDelete = null;
    }
  }

  drop(event: any) {
    if (!this.playlist || !this.playlist.tracks) {
      return;
    }
    var previous = event.previousIndex;
    var newIndex = event.currentIndex;
    if (newIndex == previous) {
      return;
    }
    var track = this.playlist.tracks[previous];
    if (previous < newIndex) {
      for (var index = previous; index <= newIndex; index++) {
        this.playlist.tracks[index].position--;
      }
    } else if(previous > newIndex) {
      for (var i = previous; i >= newIndex; i--) {
        if (i >= this.playlist.tracks.length) {
          continue;
        }
        this.playlist.tracks[i].position++;
      }
    }

    track.position = newIndex;
    this.sortPlaylist();
    this.podcastRepositoryService.updateEpisodePositionInPlaylist(this.playlistId, track.playlistTrack_Id!, newIndex).subscribe(playlist => {
      this.playlist = playlist;
      this.sortPlaylist();
    })
  }

}
