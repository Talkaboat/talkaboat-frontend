import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-list-view-header',
  templateUrl: './episode-list-view-header.component.html',
  styleUrls: ['./episode-list-view-header.component.scss']
})
export class EpisodeListViewHeaderComponent implements OnInit {

  @Input()
  public podcastName: string = 'unknown';
  @Input()
  public userName: string = 'unknown';

  constructor() { }

  ngOnInit(): void {
  }

}
