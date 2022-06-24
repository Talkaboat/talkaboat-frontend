import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { PodcastSearchResponse } from 'src/app/services/repository/search-repository/models/podcast-search-response.model';
import { SearchService } from 'src/app/services/search/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class SearchComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  isSearching = false;
  searchResponse: PodcastSearchResponse[] = []
  type = 0;
  constructor(private readonly searchService: SearchService, private readonly mediaHelper: MediaHelperService, private readonly mediaPlayerService: MediaPlayerService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.searchService.onChangedSearchResponse.subscribe(searchResponse => this.setSearchResponse(searchResponse)));
    this.setSearchResponse(this.searchService.searchResponse);
    if (!this.searchService.isSearching
      && this.searchService.searchTerm
      && (!this.searchResponse
      || this.searchResponse.length <= 0)) {
      this.isSearching = true;
      this.searchService.executeSearch(this.searchService.searchTerm);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setSearchResponse(searchResponse: PodcastSearchResponse[]) {
    this.searchResponse = searchResponse;
    this.isSearching = false;
    if (searchResponse == null || searchResponse.length <= 0) {
      return;
    }

    this.searchResponse.forEach(entry => entry.isLoading = true);
    if (this.searchResponse.some(i => i.id <= -1)) {
      return;
    }
    // const newElement: PodcastSearchResult = { aboat_id: -1, id: "-1", rss: "ad", pub_date_ms: -1, image: "ad", title_original: "ad", audio_length_sec: -1, title_highlighted: "ad", description_original: "ad" }
    // const n = searchResponse.count < 23 ? searchResponse.results.length / 2 + 1 : 11;
    // const res = this.searchResponse.results.reduce((list: any, elem, i) => {
    //   list.push(elem);
    //   if((i+1) % n === 0) list.push(newElement);
    //   return list;
    // }, []);
    // this.searchResponse.results = res;
  }

  add(track: PodcastSearchResponse) {
    if (track) {
      this.mediaHelper.addOrRemoveBookmark(track.id);
    }
  }

  windowSize() {
    return window.innerWidth;
  }

}
