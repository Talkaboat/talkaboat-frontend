import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Genre } from 'src/constants/media/models/genre.model.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class HomeComponent implements OnInit {

  isFilterOpen = false;
  searchTerm = new FormControl('', [Validators.required]);
  isCreator: boolean = false;
  items: Podcast[] = [];
  genres: Genre[] = [];

  selectedGenres: Genre[] = [];
  podcastDiscoveryIsLoading = true;
  dropdownSettings: IDropdownSettings = {
    idField: 'id',
    enableCheckAll: false,
    allowSearchFilter: true,
    textField: 'name',
    limitSelection: 3
  };
  typeAheadEntries: string[] = [];
  subscriptions: Subscription[] = [];
  constructor(private readonly searchService: SearchService, private readonly podcastRepo: PodcastRepositoryService, private readonly mediaHelperService: MediaHelperService, private readonly router: Router) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.searchTerm.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      if (term) {
        this.subscriptions.push(this.searchService.getTypeahead(term).subscribe((results: string[]) => {
          this.typeAheadEntries = results;
        }));
      } else {
        this.typeAheadEntries = [];
      }
    }));
    this.searchService.onChangedSearch.subscribe(term => this.searchTerm.setValue(term));
    this.searchTerm.setValue(this.searchService.searchTerm);
    this.genres = this.mediaHelperService.genreData;
    this.subscriptions.push(this.mediaHelperService.onGenreDataChanged.subscribe(genres => {
      this.genres = genres;
    }));
    this.apply();

  }

  apply() {
    this.podcastDiscoveryIsLoading = true;
    this.items = [];
    if (this.selectedGenres && this.selectedGenres.length > 0) {
      this.podcastRepo.getRandomPodcastWithGenre(this.selectedGenres).subscribe(result => this.applyResults(result));
    } else {
      this.podcastRepo.getRandomPodcast().subscribe(result => {
        this.applyResults(result)
      });
    }
  }

  applyResults(podcasts: Podcast[]) {
    this.items = podcasts;
    this.podcastDiscoveryIsLoading = false;
  }

  search() {
    if (this.searchTerm.valid) {
      this.searchService.search(this.searchTerm.value, true);
    }
  }

}
