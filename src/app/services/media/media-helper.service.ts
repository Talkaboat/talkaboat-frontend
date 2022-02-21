import { Injectable } from '@angular/core';
import { GENRES } from 'src/constants/media/genres.constants';
import { PodcastRepositoryService } from '../repository/search-repository/podcast-repository.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MediaHelperService {
  genreData = GENRES;
  library: number[] = [];
  constructor(private readonly podcastRepositoryService: PodcastRepositoryService, private readonly userService: UserService) {
    userService.onUserStateChanged.subscribe(state => {
      if (state) {
        this.getLibrary();
      } else {
        this.library = [];
      }
    });
  }

  public getLibrary() {
    this.podcastRepositoryService.getLibrary().subscribe(
      entries => this.library = entries
    );
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
