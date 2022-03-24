import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PoolInfo } from 'src/app/services/repository/smart-contract-repository/models/pool-info.model';
import { SmartContractRepositoryService } from 'src/app/services/repository/smart-contract-repository/smart-contract-repository.service';
import { LoungeService } from 'src/app/services/web3/lounge/lounge.service';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss']
})
export class LoungeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  pools: PoolInfo[] = [];
  selectedPools: PoolInfo[] = [];
  onlyActive: boolean = false;
  gotWallet = false;
  constructor(private readonly smartRepository: SmartContractRepositoryService, private readonly loungeService: LoungeService, private readonly web3Service: Web3Service) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.gotWallet = this.web3Service.accounts?.length > 0;
    this.subscriptions.push(this.web3Service.accountsObservable.subscribe(() => {
      this.gotWallet = this.web3Service.accounts?.length > 0;
      this.initPools(this.pools);
    }));
    this.smartRepository.getPools().subscribe(pools => {
      this.initPools(pools);
    })
  }

  async initPools(pools: PoolInfo[]) {
    this.pools = pools;
    this.selectedPools = this.pools;
    await this.loungeService.updatePools(pools);
  }

  getOnlyActivePools(active: boolean) {
    this.selectedPools = [];
    this.selectedPools = this.pools.filter(pool => active ? pool.allocPoint > 0 : pool);
  }

}
