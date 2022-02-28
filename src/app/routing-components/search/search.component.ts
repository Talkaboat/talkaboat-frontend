import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { PodcastSearchResponse } from 'src/app/services/repository/search-repository/models/podcast-search-response.model';
import { PodcastSearchResult } from 'src/app/services/repository/search-repository/models/podcast-search-result.model';
import { SearchService } from 'src/app/services/search/search.service';
import { EPISODE_SEARCH_RESULT_MOCK } from 'src/constants/mocks/episode-search-result.mock.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class SearchComponent implements OnInit {

  subscriptions: Subscription[] = [];

  searchResponse: PodcastSearchResponse = { took: 0, count: 0, total: 0, results: [], next_offset: 0}
  type = 0;
  constructor(private readonly searchService: SearchService, private readonly mediaHelper: MediaHelperService, private readonly mediaPlayerService: MediaPlayerService) { }

  ngOnInit(): void {
    this.setSearchResponse(EPISODE_SEARCH_RESULT_MOCK);
    return;
    this.searchService.onChangedSearchResponse.subscribe(searchResponse => this.setSearchResponse(searchResponse));
    this.setSearchResponse(this.searchService.searchResponse);
    if (!this.searchService.isSearching && this.searchService.searchTerm) {
      this.searchService.executeSearch(this.searchService.searchTerm);
    }
  }

  setSearchResponse(searchResponse: PodcastSearchResponse) {
    this.searchResponse = searchResponse;
    this.searchResponse.results.forEach(entry => entry.isLoading = true);
  }

  play(track: PodcastSearchResult) {
    this.mediaPlayerService.setTrackFromPodcastSearchResult(track, true);
  }

  add(track: PodcastSearchResult) {
    if (!track.podcast) {
      console.log("remove")
      this.mediaHelper.addOrRemoveBookmark(track.aboat_id);
    }
  }

}
