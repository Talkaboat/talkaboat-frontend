import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3Service } from '../../web3/web3.service';
import { RepositoryService } from '../repository.service';
import { Episode } from './models/episode.model';
import { PodcastSearchResponse } from './models/podcast-search-response.model';
import { PodcastSearchResult } from './models/podcast-search-result.model';
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

  public getPodcast(id: string, sort = "asc", pubdate = 0): Observable<Podcast> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_DETAILS.replace("{id}", id).replace("{sort}", sort).replace("{pubdate}", pubdate.toString());
    return this.post(api, null);
  }

    //Which information do we need?
  public search(query: PodcastSearch): Observable<PodcastSearchResponse> {
    const api = PODCAST_API.URL + PODCAST_API.SEARCH_URL;
    return this.post(api, query);
  }

  addBookmark(aboat_id: number): Observable<any> {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_ADD_URL.replace("{id}", aboat_id.toString());
    return this.post(api, undefined);
  }

  removeBookmark(aboat_id: number) {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_REMOVE_URL.replace("{id}", aboat_id.toString());
    return this.post(api, undefined);
  }

  public getLibrary(): Observable<number[]> {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_URL;
    return this.get(api);
  }

  public getDetails(): Observable<[Podcast]> {
    const api = PODCAST_API.URL + PODCAST_API.LIBRARY_DETAIL_URL;
    return this.get(api);
  }
}
