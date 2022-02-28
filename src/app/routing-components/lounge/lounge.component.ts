import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PoolInfo } from 'src/app/services/repository/smart-contract-repository/models/pool-info.model';
import { SmartContractRepositoryService } from 'src/app/services/repository/smart-contract-repository/smart-contract-repository.service';
import { LoungeService } from 'src/app/services/web3/lounge/lounge.service';

@Component({
  selector: 'app-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss']
})
export class LoungeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  pools: PoolInfo[] = [];
  selectedPools: PoolInfo[] = [];
  onlyActive: boolean =  false;
  constructor(private readonly smartRepository: SmartContractRepositoryService, private readonly loungeService: LoungeService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
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
