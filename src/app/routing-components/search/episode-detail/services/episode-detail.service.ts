import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { EpisodeDetailModel } from '../models/EpisodeModel';

@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailService extends RepositoryService { //TODO verschieben

  public episodeIds: number[] = [];
  public currentEpisodeId: number = -1;

  private baseUrl = 'episodes';

  constructor(protected override readonly http: HttpClient, 
    protected override web3Service: Web3Service) {
    super(http, web3Service);

  }

  public test(id: number = 3): Observable<EpisodeDetailModel[]> {
    const api = this.baseUrl + '/' + id;
    return this.get(api);
  }

}
