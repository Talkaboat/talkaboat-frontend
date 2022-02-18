import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-slot',
  templateUrl: './search-slot.component.html',
  styleUrls: ['./search-slot.component.scss']
})
export class SearchSlotComponent implements OnInit {

  searchTerm = new FormControl('', [Validators.required]);

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.onChangedSearch.subscribe(term => this.searchTerm.setValue(term));
    this.searchTerm.setValue(this.searchService.searchTerm);
  }

  search() {
    if(this.searchTerm.valid) {
      this.searchService.search(this.searchTerm.value, true);
    }
  }

}
