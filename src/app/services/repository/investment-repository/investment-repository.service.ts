import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { Web3Service } from '../../web3/web3.service';
import { RepositoryService } from '../repository.service';
import { INVESTMENT_API } from './investment-urls.const';
import { Investment } from './models/investment.model.dto';

@Injectable({
  providedIn: 'root'
})
export class InvestmentRepositoryService  extends RepositoryService  {

  constructor(protected override readonly http: HttpClient, protected override readonly web3Service: Web3Service, private readonly userService: UserService) {
    super(http, web3Service);
  }

  public getInvests():  Observable<Investment[]> {
    const api = INVESTMENT_API.URL;
    return this.get(api);
  }
}
