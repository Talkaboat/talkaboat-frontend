import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class HomeComponent implements OnInit {

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
