import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { EpisodeDetailModel } from '../../../routing-components/search/episode-detail/models/EpisodeModel';

@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailRepositoryService extends RepositoryService { //TODO verschieben

  public podcast: string = 'Podcastname';

  public episodeIds: number[] = [];
  public currentEpisodeId: number = -1;

  private baseUrl = 'episodes';
  private episodeDetailUrl = this.baseUrl + '/episode';

  constructor(protected override readonly http: HttpClient,
    protected override web3Service: Web3Service,
    protected readonly activatedRoute: ActivatedRoute) {
    super(http, web3Service);

    this.activatedRoute.queryParams.subscribe(params => {
      this.currentEpisodeId = params['ep'];
    });

  }

  public getEpisodeDetails(): Observable<EpisodeDetailModel> {
    const api = this.episodeDetailUrl + '/' + this.currentEpisodeId;
    return this.get(api);
  }

  public getPodcastEpisodesList(id: number): Observable<EpisodeDetailModel[]> {
    const api = this.baseUrl + '/' + id;
    return this.get(api);
  }

}
