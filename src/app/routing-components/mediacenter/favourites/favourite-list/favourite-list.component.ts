import { Component, Input, OnInit } from '@angular/core';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteListComponent implements OnInit {

  @Input()
  episodes! : Episode[]

  constructor() { }

  ngOnInit(): void {
  }

}
