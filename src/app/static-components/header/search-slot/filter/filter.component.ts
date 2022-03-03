import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { genres } from 'src/app/services/search/models/genres';
import { languages } from 'src/app/services/search/models/languages';
import { SEARCH_TYPE } from 'src/app/services/search/models/search.type';
import { SearchService } from 'src/app/services/search/search.service';
import { Genre } from 'src/constants/media/models/genre.model.dto';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() isFilterOpen = false;


  languageDataModel: string[] = [];
  genreDataModel: Genre[] = [];
  searchType = SEARCH_TYPE.EPISODE;

  languages: string[] = languages;
  genres: Genre[] = genres;

  dropdownSettings: IDropdownSettings = {
    idField: 'name',
    enableCheckAll: false,
    allowSearchFilter: true,
    textField: 'name',
    limitSelection: 3
  };

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.onChangedSearchType.subscribe(type => {
      this.searchType = type;
    });
    this.searchService.onChangedLanguages.subscribe(languages => {
      this.getLanguages(languages);
    });
    this.searchService.onChangedGenres.subscribe(genres => {
      this.getGenres(genres);
    });

    this.searchType = this.searchService.searchType;
    this.getLanguages(this.searchService.searchLanguages);
    this.getGenres(this.searchService.searchGenres);
  }

  getGenres(genres: string[]) {
    if (!genres || genres.length == 0) {
      this.genreDataModel = [];
      return;
    }
    var verifiedGenres: Genre[] = [];
    this.genres.forEach(entry => {
        if (genres.includes(entry.id.toString())) {
          verifiedGenres.push(entry);
        }
    });
    this.genreDataModel = verifiedGenres;
  }

  getLanguages(languages: string[]) {
    if (!languages || languages.length == 0) {
      this.languageDataModel = [];
      return;
    }
    var verifiedLanguages: string[] = [];
    this.languages.forEach(entry => {
      for (var index = 0; index < this.languages.length; index++) {
        if (entry && languages[index] && entry.toLowerCase() == languages[index].toLowerCase()) {
          verifiedLanguages.push(languages[index]);
        }
      }
    });
    this.languageDataModel = verifiedLanguages;
  }

  setSearchType(searchType: string) {
    this.searchService.changeSearchType(searchType);
  }

  apply() {
    var selectedGenres = "";
    console.log(this.genreDataModel);
    for (var index = 0; index < this.genreDataModel.length; index++) {

      selectedGenres += this.genres.filter(genre => genre.name === this.genreDataModel[index].name)[0].id + (index == this.genreDataModel.length - 1 ? "" : ",");
    }
    if (selectedGenres.length == 0) {
      selectedGenres = "-1";
    }
    var selectedLanguages = "";
    if (this.languageDataModel.length == 0) {
      selectedLanguages = "all";
    }
    else {
      for (var index = 0; index < this.languageDataModel.length; index++) {
        selectedLanguages += this.languageDataModel[index] + (index == this.languageDataModel.length - 1 ? "" : ",");
      }
    }
    this.searchService.changeGenres(selectedGenres);
    this.searchService.changeLanguage(selectedLanguages);
  }

}
