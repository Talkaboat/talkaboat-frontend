import { Injectable } from '@angular/core';
import { GENRES } from 'src/constants/media/genres.constants';
import { Genre } from 'src/constants/media/models/genre.model.dto';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  genreData = GENRES;
  constructor() { }

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
