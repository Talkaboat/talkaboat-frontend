import { Component, OnInit } from '@angular/core';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { PODCAST_DETAIL_MOCK } from 'src/constants/mocks/podcast-detail.mock.constants';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.scss']
})
export class PodcastDetailComponent implements OnInit {

  canNavigateBack: boolean = false;
  podcastData?: Podcast;
  isLoading = true;
  isDescriptionOpen = false;
  genreNames: string[] = [];
  constructor(private readonly websiteStateService: WebsiteStateService, private readonly mediaService: MediaHelperService) { }

  ngOnInit(): void {
    this.podcastData = JSON.parse(JSON.stringify(PODCAST_DETAIL_MOCK));
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.genreNames = this.mediaService.getGenreNamesFromIds(this.podcastData?.genre_ids);
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

  play(episodeIndex: number) {
    if (this.podcastData && this.podcastData.episodes && this.podcastData.episodes.length > 0) {

    }
  }



}
