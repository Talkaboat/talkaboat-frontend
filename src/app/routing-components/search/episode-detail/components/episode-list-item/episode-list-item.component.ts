import { Component, Input, OnInit } from '@angular/core';
import { EpisodeDetailModel } from '../../models/EpisodeModel';

@Component({
  selector: 'app-episode-list-item',
  templateUrl: './episode-list-item.component.html',
  styleUrls: ['./episode-list-item.component.scss']
})
export class EpisodeListItemComponent implements OnInit {

  @Input()
  public episode!: EpisodeDetailModel;

  constructor() { }

  ngOnInit(): void {
  }

}
