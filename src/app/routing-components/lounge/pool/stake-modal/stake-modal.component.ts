import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  amount = "0";

  modalForm: FormGroup = this.formBuilder.group({
    amount: [this.amount, [Validators.required, Validators.min(0.000000000000000018)]]
  })


  @Output() close = new EventEmitter<boolean>();
  constructor(private readonly tokenService: TokenService, private readonly loungeService: LoungeService, private readonly formBuilder: FormBuilder) { }

  async ngOnInit() {
    if (this.poolInfo) {
      const balance = await this.tokenService.getBalance(this.poolInfo.lpToken);
      this.walletBalance = { raw: balance, formatted: balance.div(10 ** this.poolInfo.decimals).round(6, RoundingMode.RoundDown) }
    }
  }

  setAmountToBalance() {
    const update = { amount: parseFloat(Big(this.isWithdrawal ? this.poolInfo!.amount : this.walletBalance?.formatted).toFixed(18, RoundingMode.RoundDown)).toString() };
    this.modalForm.setValue(update);
  }

  async stake() {
    let liquidityAmount = Big(this.modalForm.get("amount")!.value).mul(10 ** this.poolInfo!.decimals);
    if (liquidityAmount.gt(new Big(this.walletBalance.raw))) {
      liquidityAmount = new Big(this.walletBalance.raw);
    }
    //Start Loading
    this.loungeService.addLiquidity(this.poolInfo!, liquidityAmount).then(result => {
      if (result) {
        this.amount = "0";
        //SUCCESS

      this.close.emit(true);
      }
    }).finally(() => {
      //End Loading
    });
  }

  async withdraw() {
    if (this.poolInfo) {
      let liquidityAmount = Big(this.modalForm.get("amount")!.value).mul(10 ** this.poolInfo!.decimals);
      if (liquidityAmount.gt(this.poolInfo.rawAmount)) {
        liquidityAmount = Big(this.poolInfo.rawAmount);
      }

      let success = false;
      this.loungeService.removeLiquidity(this.poolInfo, liquidityAmount).then(result => {
        if (result) {
          this.close.emit(true);
        }
      }).finally(() => {
        //End Loading
      });
    }
  }

}
