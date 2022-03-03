import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-slot',
  templateUrl: './search-slot.component.html',
  styleUrls: ['./search-slot.component.scss']
})
export class SearchSlotComponent implements OnInit, OnDestroy {
  isFilterOpen = false;
  searchTerm = new FormControl('', [Validators.required]);

  constructor(private readonly searchService: SearchService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.searchService.onChangedSearch.subscribe(term => this.searchTerm.setValue(term));
    this.searchTerm.setValue(this.searchService.searchTerm);
  }

  search() {
    if (this.searchTerm.valid) {
      this.isFilterOpen = false;
      this.searchService.search(this.searchTerm.value, true);
    }
  }

}
