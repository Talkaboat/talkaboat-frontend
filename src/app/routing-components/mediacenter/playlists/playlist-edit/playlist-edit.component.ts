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
  private playlist: Playlist | null = null;
  constructor(private readonly route: ActivatedRoute, private readonly podcastRepositoryService: PodcastRepositoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistId = params['pid'];
      this.podcastRepositoryService.getPlaylist(this.playlistId).subscribe(playlist => {
        this.playlist = playlist;
        console.log(this.playlist);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }

}
