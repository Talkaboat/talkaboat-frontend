import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

  @Input()
  playlists! : Playlist[]

  constructor() { }

  ngOnInit(): void {
  }

}
