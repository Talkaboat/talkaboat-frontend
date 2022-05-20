import { EventEmitter, Injectable } from '@angular/core';
import { Genre } from 'src/constants/media/models/genre.model.dto';
import { Episode } from '../repository/search-repository/models/episode.model';
import { Playlist } from '../repository/search-repository/models/playlist/playlist.model.dto';
import { Podcast } from '../repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from '../repository/search-repository/podcast-repository.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MediaHelperService {
  genreData: Genre[] = [];
  library: number[] = [];
  isManipulating: number[] = [];
  lastPodcastDetail: Podcast | undefined = undefined;
  episodeToAddToPlaylist: Episode | null = null;

  userPlaylists: Playlist[] = [];

  onGenreDataChanged: EventEmitter<Genre[]> = new EventEmitter<Genre[]>();
  onLibraryChanged: EventEmitter<number[]> = new EventEmitter<number[]>();
  onItemAddedToPlaylist: EventEmitter<boolean> = new EventEmitter<boolean>();
  onPlaylistsChanged: EventEmitter<Playlist[]> = new EventEmitter<Playlist[]>();
  constructor(private readonly podcastRepositoryService: PodcastRepositoryService, private readonly userService: UserService) {
    podcastRepositoryService.getGenres().subscribe((genres: Genre[]) => {
      this.genreData = genres;
      this.onGenreDataChanged.emit(this.genreData);
    });
    userService.onUserStateChanged.subscribe(state => {
      if (state) {
        this.setup();
      } else {
        this.reset();
      }
    });
  }

  public isBookmarked(id: number) {
    return this.library.includes(id);
  }

  public setup() {
    this.getLibrary();
    this.getPlaylistOverviews();
  }

  public getPlaylistOverviews() {
    this.podcastRepositoryService.getPlaylists().subscribe(data => {
      this.userPlaylists = data;
      this.onPlaylistsChanged.emit(this.userPlaylists);
    });
  }

  public initPlaylistAdd(episodeToAddToPlaylist: Episode) {
    this.episodeToAddToPlaylist = episodeToAddToPlaylist;
  }

  public cancelPlaylistAdd() {
    this.episodeToAddToPlaylist = null;
  }

  public confirmPlaylistAdd(playlistId: number) {
    if (this.episodeToAddToPlaylist) {
      this.podcastRepositoryService.addEpisodeToPlaylist(playlistId, this.episodeToAddToPlaylist.aboat_id).subscribe(_ => this.onItemAddedToPlaylist.emit(true));
      this.episodeToAddToPlaylist = null;
    }
  }

  public reset() {
    this.library = [];
  }

  public getLibrary() {
    this.podcastRepositoryService.getLibrary().subscribe(
      entries => {
        this.library = entries;
        this.onLibraryChanged.emit(this.library);
      }
    );
  }

  public addOrRemoveBookmark(id: number) {
    if (this.isManipulating.includes(id)) {
      return;
    }
    this.isManipulating.push(id);
    if (this.isBookmarked(id)) {
      this.podcastRepositoryService.removeBookmark(id).subscribe(_ => this.finishManipulation(id));
    } else {
      this.podcastRepositoryService.addBookmark(id).subscribe(_ => this.finishManipulation(id));
    }
  }

  finishManipulation(id: number) {
    this.getLibrary()
    this.isManipulating = this.isManipulating.filter(entry => entry !== id);
  }

  public getGenreNamesFromIds(genreIds: number[] | undefined): string[] {
    if (genreIds) {
      var genreNames: string[] = [];
      this.genreData.forEach(entry => {
        if (genreIds.includes(entry.id)) {
          genreNames.push(entry.name);
        }
      });
      return genreNames;
    }
    return [];
  }
}
