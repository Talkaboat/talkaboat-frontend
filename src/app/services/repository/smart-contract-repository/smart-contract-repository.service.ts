import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryService } from '../repository.service';
import { PoolInfo } from './models/pool-info.model';
import { SMART_CONTRACT_API } from './smart-contract-urls.const';

@Injectable({
  providedIn: 'root'
})
export class SmartContractRepositoryService  extends RepositoryService {

  public getPools(): Observable<PoolInfo[]> {
    const api = SMART_CONTRACT_API.URL + SMART_CONTRACT_API.POOLS_URL;
    return this.get<PoolInfo[]>(api);
  }
}
