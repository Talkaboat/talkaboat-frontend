import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  constructor(private readonly route: ActivatedRoute, private readonly podcastRepositoryService: PodcastRepositoryService) { }

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

  drop(event: any) {
    if (!this.playlist || !this.playlist.tracks) {
      return;
    }
    var previous = event.previousIndex;
    var newIndex = event.currentIndex;
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
    this.podcastRepositoryService.updateEpisodePositionInPlaylist(this.playlistId, track.playlistTrack_Id!, newIndex).subscribe(playlist => {
      this.playlist = playlist;
      this.sortPlaylist();
    })
  }

}
