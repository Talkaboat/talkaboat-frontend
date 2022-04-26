import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Big, { RoundingMode } from 'big.js';
import { PoolInfo } from 'src/app/services/repository/smart-contract-repository/models/pool-info.model';
import { LoungeService } from 'src/app/services/web3/lounge/lounge.service';
import { TokenService } from 'src/app/services/web3/token/token.service';

@Component({
  selector: 'app-stake-modal',
  templateUrl: './stake-modal.component.html',
  styleUrls: ['./stake-modal.component.scss']
})
export class StakeModalComponent implements OnInit {
  @Input() poolInfo?: PoolInfo;
  @Input() isWithdrawal: boolean = false;
  walletBalance = { raw: Big(0), formatted: Big(0) };

  @Output() close = new EventEmitter<boolean>();
  constructor(private readonly tokenService: TokenService, private readonly loungeService: LoungeService, formBuilder: FormBuilder) { }

  async ngOnInit() {
    if (this.poolInfo) {
      const balance = await this.tokenService.getBalance(this.poolInfo.lpToken);
      this.walletBalance = { raw: balance, formatted: balance.div(10 ** this.poolInfo.decimals).round(6, RoundingMode.RoundDown) }
    }
  }

  setAmountToBalance() {
    //this.amount = Big(this.isWithdrawal ? this.poolInfo.amount : this.walletBalance?.formatted);
  }

}
