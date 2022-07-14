import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Genre } from 'src/constants/media/models/genre.model.dto';
import { RepositoryService } from '../repository.service';
import { Episode } from './models/episode.model';
import { PlaylistTrack } from './models/playlist/playlist-track.model.dto';
import { Playlist } from './models/playlist/playlist.model.dto';
import { PodcastSearchResponse } from './models/podcast-search-response.model';
import { PodcastSearch } from './models/podcast-search.model';
import { Podcast } from './models/podcast.model';
import { PODCAST_API } from './podcast-urls.const';

@Injectable({
  providedIn: 'root'
})
export class PodcastRepositoryService extends RepositoryService {


  public getEpisode(id: string): Observable<Episode> {
    const api = PODCAST_API.URL + PODCAST_API.EPISODE_DETAILS.replace("{id}", id);
    return this.post(api, null);
  }

  public getEpisodes(podcastId: string, sort = "desc", amount = -1, offset = 0,): Observable<Episode[]> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_EPISODES;
    return this.post(api, { id: podcastId, amount, offset, sort});
  }

  public getPodcast(id: string, sort = "desc", offset = 0, amount = 10): Observable<Podcast> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_DETAILS;
    return this.post(api, { id, amount, offset, sort});
  }

  public getRandomPodcast(amount = 10): Observable<Podcast[]> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_RANDOM_URL.replace("{amount}", amount.toString());
    return this.get(api);
  }

  public getRandomPodcastByRank(rank: number, amount = 10): Observable<Podcast[]> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_RANDOM_RANK_URL.replace("{amount}", amount.toString()).replace("{rank}", rank.toString());
    return this.get(api);
  }

  public getRandomPodcastWithGenre(genres: Genre[], amount = 10): Observable<Podcast[]> {
    var genreIds: number[] = [];
    genres.forEach(genre => {
      genreIds.push(genre.id);
    });
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_RANDOM_W_GENRES_URL.replace("{amount}", amount.toString()).replace("{genres}", genreIds.toString());
    return this.get(api);
  }

    //Which information do we need?
  public search(query: PodcastSearch): Observable<PodcastSearchResponse[]> {
    const api = PODCAST_API.URL + PODCAST_API.SEARCH_URL;
    return this.post(api, { queue: query.searchTerm, language: query.language, genre: query.genres, amount: query.amount, offset: query.offset });
  }

  getTypeahead(term: any): Observable<string[]> {
    const api = PODCAST_API.URL + PODCAST_API.TYPEAHEAD_DEFAULT_URL.replace("{queue}", term);
    return this.get(api);
  }

  public getPlaylists(): Observable<Playlist[]> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_GET_ALL_URL;
    return this.get(api);
  }

  public getPlaylist(playlistId: number): Observable<Playlist> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_GET_URL.replace("{id}", playlistId.toString());
    return this.get(api);
  }

  public addPlaylist(name: string, image: string = '', tracks: any[] = []): Observable<Playlist> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_ADD_URL;
    const body = { name, image, tracks}
    return this.post(api, body);
  }

  public addEpisodeToPlaylist(playlistId: number, episodeId: number): Observable<PlaylistTrack> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_ADD_EPISODE_URL.replace("{id}", playlistId.toString()).replace("{episode}", episodeId.toString());
    return this.post(api);
  }

  removeEpisodeFromPlaylist(playlistId: number, playlistTrack_Id: number | undefined): Observable<Playlist> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_REMOVE_EPISODE_URL.replace("{id}", playlistId.toString()).replace("{trackId}", playlistTrack_Id!.toString());
    return this.delete(api);
  }

  public updateEpisodePositionInPlaylist(playlistId: number, trackId: number, position: number): Observable<Playlist> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_UPDATE_EPISODE_URL.replace("{id}", playlistId.toString()).replace("{trackId}", trackId.toString()).replace("{position}", position.toString());
    return this.put(api);
  }

  deletePlaylist(playlistId: number | undefined): Observable<any> {
    if (!playlistId) {
      return throwError(() => "Error From ThrowError observable")
    }
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_DELETE_URL.replace("{id}", playlistId.toString());
    return this.delete(api);
  }


  addBookmark(aboat_id: number): Observable<any> {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_ADD_URL.replace("{id}", aboat_id.toString());
    return this.post(api);
  }

  removeBookmark(aboat_id: number) {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_REMOVE_URL.replace("{id}", aboat_id.toString());
    return this.post(api);
  }

  public getLibrary(): Observable<number[]> {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_URL;
    return this.get(api);
  }

  public getLibraryDetails(): Observable<[Podcast]> {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_DETAIL_URL;
    return this.get(api);
  }

  getGenres() : Observable<Genre[]> {
    const api = PODCAST_API.URL + PODCAST_API.GENRES_URL;
    return this.get(api);
  }
}
