import { Component, Input, OnInit } from '@angular/core';
import { PoolInfo } from 'src/app/services/repository/smart-contract-repository/models/pool-info.model';
import { LoungeService } from 'src/app/services/web3/lounge/lounge.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  @Input() poolInfo?: PoolInfo;
  isOpen = false;
  approving = false;
  constructor(private readonly loungeService: LoungeService) { }

  ngOnInit(): void {
    console.log(this.poolInfo);
  }

  getTokenIcon(symbol: string) {
    return "./assets/images/coins/0.png".replace("0", symbol.toLowerCase());
  }

  approve() {
    if (this.approving || !this.poolInfo) {
      return;
    }
    this.approving = true;
    this.loungeService.approve(this.poolInfo).then(result => {
      this.approving = false;
      this.loungeService.getAllowance(this.poolInfo!).then(allowance => {
        this.poolInfo!.allowance = allowance;
      });
    });
  }
}
