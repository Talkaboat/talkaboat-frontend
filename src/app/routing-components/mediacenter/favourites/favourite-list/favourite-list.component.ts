import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteListComponent implements OnInit {

  @Input()
  episodes! : Episode[];

  @Output() playEpisodeEvent = new EventEmitter<Episode>();

  constructor() { }

  ngOnInit(): void {
  }

  episodePlayClicked(clickedEpisode: Episode, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.playEpisodeEvent.emit(clickedEpisode);
  }

}
