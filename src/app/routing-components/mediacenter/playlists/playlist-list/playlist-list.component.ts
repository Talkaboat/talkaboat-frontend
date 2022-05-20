import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

  @Input()
  playlists! : Playlist[];

  @Output() playPlaylistEvent = new EventEmitter<Playlist>();
  @Output() viewPlaylistEvent = new EventEmitter<Playlist>();
  @Output() deletePlaylistEvent = new EventEmitter<Playlist>();

  playlistPlayClicked(clickedPlaylist: Playlist, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.playPlaylistEvent.emit(clickedPlaylist);
  }

  playlistViewClicked(clickedPlaylist: Playlist) {
    this.viewPlaylistEvent.emit(clickedPlaylist);
  }

  deletePlaylist(clickedPlaylist: Playlist) {
    this.deletePlaylistEvent.emit(clickedPlaylist);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
