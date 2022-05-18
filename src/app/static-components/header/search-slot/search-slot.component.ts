import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-slot',
  templateUrl: './search-slot.component.html',
  styleUrls: ['./search-slot.component.scss']
})
export class SearchSlotComponent implements OnInit, OnDestroy {
  @ViewChild('modalToggle', { read: ElementRef, static:false }) modalToggle?: ElementRef;
  isFilterOpen = false;
  searchTerm = new FormControl('', [Validators.required]);
  typeAheadEntries: string[] = [];
  constructor(private readonly searchService: SearchService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.searchTerm.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      if (term) {
        this.searchService.getTypeahead(term).subscribe((results: string[]) => {
          this.typeAheadEntries = results;
        })
      } else {
        this.typeAheadEntries = [];
      }
    });
    this.searchService.onChangedSearch.subscribe(term => this.searchTerm.setValue(term));
    this.searchTerm.setValue(this.searchService.searchTerm);
  }

  search() {
    if (this.searchTerm.valid) {
      if (this.modalToggle) {
        this.modalToggle.nativeElement.checked = false;
      }
      this.isFilterOpen = false;
      this.searchService.search(this.searchTerm.value, true);
    }
  }

}
