import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';

@Component({
  selector: 'app-podcast-list-view-item',
  templateUrl: './podcast-list-view-item.component.html',
  styleUrls: ['./podcast-list-view-item.component.scss']
})
export class PodcastListViewItemComponent implements OnInit {

  @Input()
  item! : Podcast

  @Output()
  toggleLibrary : EventEmitter<Podcast> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleLibraryClicked() {
    this.toggleLibrary.emit(this.item);
  }

}
