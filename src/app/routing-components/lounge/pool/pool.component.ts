import { Component, Input, OnInit } from '@angular/core';
import Big from 'big.js';
import { PoolInfo } from 'src/app/services/repository/smart-contract-repository/models/pool-info.model';
import { LoungeService } from 'src/app/services/web3/lounge/lounge.service';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  @Input() poolInfo?: PoolInfo;
  @Input() gotWallet: boolean = false;
  isOpen = false;
  approving = false;
  withdraw = false;
  stake = false;
  constructor(private readonly loungeService: LoungeService, private readonly web3Service: Web3Service) { }

  ngOnInit(): void {
    if (this.poolInfo) {
      this.poolInfo!.depositedCoins = Big(this.poolInfo!.depositedCoins);
    }
  }

  getTokenIcon(symbol: string) {
    return "./assets/images/coins/0.png".replace("0", symbol.toLowerCase());
  }

  toggleState() {
    if (this.gotWallet) {
      this.isOpen = !this.isOpen;
    } else {
      this.web3Service.connect(true);
    }
  }

  claim() {
    this.loungeService.harvest(this.poolInfo!).then(async result => {
      if (result) {
        this.loungeService.setupPool(this.poolInfo!);
      }
    });
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

  closedModal(isFinished: boolean) {
    this.stake = false;
    this.withdraw = false;
  }
}
