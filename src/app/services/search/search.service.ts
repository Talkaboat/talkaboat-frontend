import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  public searchResponse: PodcastSearchResponse[] = [];
  public searchLanguages = [];
  public searchGenres = [];
  private rawSearchGenres: string = "";
  private rawSearchLanguages: string = "";
  private currentOffset: number = 0;
  public searchLengthMin = 0;
  public searchLengthMax = 240;
  public isSearching = false;
  private lastSearch: PodcastSearch = { searchTerm: '' };
  public onChangedSearch = new EventEmitter<string>();
  public onChangedSearchType = new EventEmitter<string>();
  public onChangedLanguages = new EventEmitter<string[]>();
  public onChangedGenres = new EventEmitter<string[]>();
  public onChangedMinLength = new EventEmitter<number>();
  public onChangedMaxLength = new EventEmitter<number>();
  public onChangedSearchResponse = new EventEmitter<PodcastSearchResponse[]>();
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
        this.lastSearch = { searchTerm: '' };
        this.searchResponse = [];
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

  getTypeahead(term: any): Observable<string[]> {
    return this.podcastRepositoryService.getTypeahead(term);
  }

  public Reset() {

  }

  public changeLanguage(language: string) {
    var languages: any = [];
    if (language && language.length > 0) {
      this.rawSearchLanguages = language;
      if (language.includes(",")) {
        languages = language.split(",");
      } else {
        languages.push(language);
      }
    }else {
      this.searchLanguages = [];
      this.rawSearchLanguages = '';
    }

    this.searchLanguages = languages;
    this.onChangedLanguages.emit(this.searchLanguages);
  }

  public changeGenres(genre: string) {

    var genres: any = [];
    if (genre && genre.length > 0) {
      this.rawSearchGenres = genre;
      if (genre.includes(",")) {
        genres = genre.split(",");
      } else {
        genres.push(genre);
      }
      this.searchGenres = genres;
    } else {
      this.searchGenres = [];
      this.rawSearchGenres = '';
    }

    this.onChangedGenres.emit(this.searchGenres);
  }

  private getSearchQuery(): PodcastSearch {
    return {
      searchTerm: this.searchTerm,
      minLength: this.searchLengthMin,
      type: this.searchType.toLowerCase(),
      maxLength: this.searchLengthMax != 240 ? this.searchLengthMax : undefined,
      language: this.rawSearchLanguages && this.rawSearchLanguages.length > 0 ? this.rawSearchLanguages : undefined,
      genres: this.rawSearchGenres && this.rawSearchGenres.length > 0  ? this.rawSearchGenres : undefined
    };
  }

  public async search(searchTerm: string, navigate: boolean = false) {
    if (searchTerm) {
      this.searchTerm = searchTerm;
    }
    if (!this.searchTerm) {
      return;
    }
    this.isSearching = true;
    this.loaderService.show();
    if (navigate) {
      this.router.navigate(['/search'], {
        queryParams: {
          'q': searchTerm, 'view': 'viewer', 'qtype': this.searchType, 'qlang': this.rawSearchLanguages, 'qgenre': this.rawSearchGenres, 'qminlen': this.searchLengthMin, 'qmaxlen': this.searchLengthMax
        }, queryParamsHandling: 'merge'
      }).then(v => {
        this.executeSearch(searchTerm)
      });
    } else {
      this.executeSearch(searchTerm);
    }
  }

  isSearchEqualToLastSearch(): boolean {
    const searchQuery = this.getSearchQuery();
    return searchQuery.genres == this.lastSearch.genres
      && searchQuery.searchTerm == this.lastSearch.searchTerm
      && searchQuery.language == this.lastSearch.language
      && searchQuery.minLength == this.lastSearch.minLength
      && searchQuery.type == this.lastSearch.type
      && searchQuery.maxLength == this.lastSearch.maxLength
      && searchQuery.minEpisodes == this.lastSearch.minEpisodes
      && searchQuery.maxEpisodes == this.lastSearch.maxEpisodes;
  }

  executeSearch(searchTerm: string) {
    if (this.isSearchEqualToLastSearch()) {
      this.loaderService.hide();
      return;
    }
    this.lastSearch = this.getSearchQuery();
    this.loaderService.show();
    this.podcastRepositoryService.search(this.lastSearch).subscribe({
      next: result => {
        this.searchResponse = result;
        if (this.searchTerm == searchTerm) {
          this.onChangedSearch.emit(searchTerm);
          this.onChangedSearchResponse.emit(this.searchResponse);
        }
      },
      complete: () => {
        if (this.searchTerm == searchTerm) {
          this.loaderService.hide();
          this.isSearching = false;
        }
      }
    });
  }
}
