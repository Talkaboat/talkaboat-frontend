import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { PodcastSearchResponse } from '../repository/search-repository/models/podcast-search-response.model';
import { PodcastSearch } from '../repository/search-repository/models/podcast-search.model';
import { PodcastRepositoryService } from '../repository/search-repository/podcast-repository.service';
import { SEARCH_TYPE } from './models/search.type';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchTerm: string = '';
  public searchType = SEARCH_TYPE.EPISODE;
  public searchResponse: PodcastSearchResponse = { took: 0, count: 0, total: 0, results: [], next_offset: 0};
  public searchLanguages = [];
  public searchGenres = [];
  private rawSearchGenres: string = "";
  private rawSearchLanguages: string = "";
  private currentOffset: number = 0;
  public searchLengthMin = 0;
  public searchLengthMax = 240;
  public onChangedSearch = new EventEmitter<string>();
  public onChangedSearchType = new EventEmitter<string>();
  public onChangedLanguages = new EventEmitter<string[]>();
  public onChangedGenres = new EventEmitter<string[]>();
  public onChangedMinLength = new EventEmitter<number>();
  public onChangedMaxLength = new EventEmitter<number>();
  public onChangedSearchResponse = new EventEmitter<PodcastSearchResponse>();
  public onReset = new EventEmitter();
  constructor(
    private readonly podcastRepositoryService: PodcastRepositoryService,
    private readonly loaderService: LoaderService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (queryParams['q']) {
        this.searchTerm = queryParams['q'];
      } else {
        this.searchTerm = "";
      }
      this.searchLengthMin = Number(queryParams['qminlen']);
      if (!queryParams['qminlen'] || Number.isNaN(this.searchLengthMin)) {
        this.searchLengthMin = 0;
      }
      this.searchLengthMax = Number(queryParams['qmaxlen']);
      if (!queryParams['qminlen'] || Number.isNaN(this.searchLengthMax)) {
        this.searchLengthMax = 240;
      }
      this.onChangedMinLength.emit(this.searchLengthMin);
      this.onChangedMaxLength.emit(this.searchLengthMax);
      this.onChangedSearch.emit(this.searchTerm);
      this.changeSearchType(queryParams['qtype']);
      this.changeLanguage(queryParams['qlang']);
      this.changeGenres(queryParams['qgenre']);
    });
  }

  public changeSearchType(searchType: string) {
    if (!searchType) {
      searchType = "";
    }
    switch (searchType.toLowerCase()) {
      case SEARCH_TYPE.PODCAST.toLowerCase(): this.searchType = SEARCH_TYPE.PODCAST; break;
      default: this.searchType = SEARCH_TYPE.EPISODE; break;
    }
    this.onChangedSearchType.emit(this.searchType);
  }

  getMoreResults(){
    if (this.searchResponse.results.length >= this.searchResponse.total || this.searchResponse.next_offset <= 0) {
      this.onChangedSearchResponse.emit(this.searchResponse);
      return;
    }
    var searchQuery = this.getSearchQuery();
    searchQuery.offset = this.searchResponse.next_offset;
    this.podcastRepositoryService.search(searchQuery).subscribe((response: PodcastSearchResponse) => {
      response.results.forEach(element => {
        this.searchResponse.results.push(element);
      });
      this.searchResponse.next_offset = response.next_offset;
      this.onChangedSearchResponse.emit(this.searchResponse);
    });
  }

  public Reset() {

  }

  public changeLanguage(language: string) {
    this.rawSearchLanguages = language;
    var languages: any = [];
    if (language) {
      if (language.includes(",")) {
        languages = language.split(",");
      } else {
        languages.push(language);
      }
    }

    this.searchLanguages = languages;
    this.onChangedLanguages.emit(this.searchLanguages);
  }

  public changeGenres(genre: string) {
    this.rawSearchGenres = genre;
    var genres: any = [];
    if (genre) {
      if (genre.includes(",")) {
        genres = genre.split(",");
      } else {
        genres.push(genre);
      }
    }

    this.searchGenres = genres;
    this.onChangedGenres.emit(this.searchGenres);
  }

  private getSearchQuery(): PodcastSearch {
    return {
      searchTerm: this.searchTerm,
      minLength: this.searchLengthMin,
      type: this.searchType.toLowerCase(),
      maxLength: this.searchLengthMax != 240 ? this.searchLengthMax : undefined,
      language: this.rawSearchLanguages != "all" ? this.rawSearchLanguages : undefined,
      genres: this.rawSearchGenres != "-1" ? this.rawSearchGenres : undefined
    }
  }

  public async search(searchTerm: string, navigate: boolean = false) {
    if (searchTerm) {
      this.searchTerm = searchTerm;
    }
    if (!this.searchTerm) {
      return;
    }
    this.loaderService.show();
    if (navigate) {
      this.router.navigate(['/search'], {
        queryParams: {
          'q': searchTerm, 'view': 'viewer', 'qtype': this.searchType, 'qlang': this.searchLanguages, 'qgenre': this.searchGenres, 'qminlen': this.searchLengthMin, 'qmaxlen': this.searchLengthMax
        }, queryParamsHandling: 'merge'
      }).then(v => this.executeSearch(searchTerm));
    } else {
      this.executeSearch(searchTerm);
    }
  }

  executeSearch(searchTerm: string) {
    console.log(searchTerm);
    return;
    this.podcastRepositoryService.search(this.getSearchQuery()).subscribe(result => {
      this.searchResponse = result;
      if (this.searchTerm == searchTerm) {
        this.onChangedSearch.emit(searchTerm);
        this.onChangedSearchResponse.emit(this.searchResponse);
      }
    });
  }
}
