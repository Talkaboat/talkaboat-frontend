import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { Playlist } from 'src/app/services/repository/search-repository/models/playlist/playlist.model.dto';

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent implements OnInit {

  playlists: Playlist[] = [];
  dropdownSettings: IDropdownSettings = {
    idField: 'playlist_Id',
    defaultOpen: false,
    enableCheckAll: false,
    allowSearchFilter: true,
    textField: 'name',
    maxHeight: 240,
    singleSelection: true

  };
  selectedPlaylist: Playlist[] = [];
  constructor(private readonly mediaService: MediaHelperService) { }

  ngOnInit(): void {
    this.mediaService.onPlaylistsChanged.subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  addToPlaylist() {
    if (this.selectedPlaylist && this.selectedPlaylist.length > 0) {
      this.mediaService.confirmPlaylistAdd(this.selectedPlaylist[0].playlist_Id)
    }
  }

}
