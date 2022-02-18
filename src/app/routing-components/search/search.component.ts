import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { PodcastSearchResponse } from 'src/app/services/repository/search-repository/models/podcast-search-response.model';
import { PodcastSearchResult } from 'src/app/services/repository/search-repository/models/podcast-search-result.model';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class SearchComponent implements OnInit {

  subscriptions: Subscription[] = [];

  searchResults: PodcastSearchResponse = { took: 0, count: 0, total: 0, results: [], next_offset: 0}
  type = 0;
  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.onChangedSearchResponse.subscribe(searchResult => {
      this.searchResults = searchResult;
      this.searchResults.results.forEach(entry => entry.isLoading = true);
    });
    this.searchResults = this.searchService.searchResponse;
    if (!this.searchService.isSearching && this.searchService.searchTerm) {
      this.searchService.executeSearch(this.searchService.searchTerm);
    }
  }

  play(track: PodcastSearchResult) {
    this.searchResults.results.splice(0, 1);
  }

}
