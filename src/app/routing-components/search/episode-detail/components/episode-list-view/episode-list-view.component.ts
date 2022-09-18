import { Component, Input, OnInit } from '@angular/core';
import { EpisodeDetailModel } from '../../models/EpisodeModel';

@Component({
  selector: 'app-episode-list-view',
  templateUrl: './episode-list-view.component.html',
  styleUrls: ['./episode-list-view.component.scss']
})
export class EpisodeListViewComponent implements OnInit {

  @Input()
  public episodes: EpisodeDetailModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
