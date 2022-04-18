import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PLAYLIST_ARRAY_MOCK } from 'src/constants/mocks/playlist.mock.constants';
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

  public getPodcast(id: string, sort = "desc", pubdate = 0, amount = 10): Observable<Podcast> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_DETAILS.replace("{id}", id).replace("{sort}", sort).replace("{amount}", amount.toString()).replace("{pubdate}", pubdate.toString());
    return this.post(api, null);
  }

    //Which information do we need?
  public search(query: PodcastSearch): Observable<PodcastSearchResponse> {
    const api = PODCAST_API.URL + PODCAST_API.SEARCH_URL;
    return this.post(api, query);
  }

  public getPlaylists(): Observable<Playlist[]> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_GET_ALL_URL;
    return this.get(api);
  }

  public getPlaylist(playlist_id: number): Observable<Playlist> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_GET_URL.replace("{id}", playlist_id.toString());
    return this.get(api);
  }

  public addPlaylist(playlist: Playlist): Observable<Playlist> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_ADD_URL;
    return this.post(api, playlist);
  }

  public addEpisodeToPlaylist(playlist_id: number, episode_id: number): Observable<PlaylistTrack> {
    const api = PODCAST_API.URL + PODCAST_API.PLAYLIST_ADD_EPISODE_URL.replace("{id}", playlist_id.toString()).replace("{episode}", episode_id.toString());
    return this.post(api);
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
}
