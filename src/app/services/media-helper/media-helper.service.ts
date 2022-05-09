import { EventEmitter, Injectable } from '@angular/core';
import { Genre } from 'src/constants/media/models/genre.model.dto';
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
  onGenreDataChanged: EventEmitter<Genre[]> = new EventEmitter<Genre[]>();
  onLibraryChanged: EventEmitter<number[]> = new EventEmitter<number[]>();
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
