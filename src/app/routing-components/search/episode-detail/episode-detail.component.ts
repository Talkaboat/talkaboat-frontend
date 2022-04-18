import { Playlist } from './../../../services/repository/search-repository/models/playlist/playlist.model.dto';
import { Component, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { PLAYLIST_ARRAY_MOCK } from 'src/constants/mocks/playlist.mock.constants';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class EpisodeDetailComponent implements OnInit {

  canNavigateBack: boolean = false;
  playlistMock: Playlist = PLAYLIST_ARRAY_MOCK[0]

  constructor(private readonly websiteStateService: WebsiteStateService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

  convertTime(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

}
