import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.searchTerm.setValue(this.searchService.searchTerm);
  }

  search() {
    if(this.searchTerm.valid) {
      this.searchService.search(this.searchTerm.value, true);
    }
  }

}
