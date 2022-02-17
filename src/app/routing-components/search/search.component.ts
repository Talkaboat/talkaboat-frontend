import { Component, OnInit } from '@angular/core';
import { PodcastSearchResponse } from 'src/app/services/repository/search-repository/models/podcast-search-response.model';
import { PodcastSearchResult } from 'src/app/services/repository/search-repository/models/podcast-search-result.model';
import { SearchService } from 'src/app/services/search/search.service';
import { SEARCH_RESULT_MOCK } from 'src/constants/mocks/search-result.mock.constants';
import { roulette_tracks } from 'src/constants/roulette_tracks';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchResults: PodcastSearchResponse = { took: 0, count: 0, total: 0, results: [], next_offset: 0}

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.searchResults = JSON.parse(JSON.stringify(SEARCH_RESULT_MOCK));
  }

  play(track: PodcastSearchResult) {
    console.log(track);
  }

}
