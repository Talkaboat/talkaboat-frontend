import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Big, { RoundingMode } from 'big.js';
import { BuybackService } from 'src/app/services/web3/buyback/buyback.service';
import { TokenService } from 'src/app/services/web3/token/token.service';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  templateUrl: './buyback.component.html',
  styleUrls: ['./buyback.component.scss']
})
export class BuybackComponent implements OnInit {

  walletBalance = { raw: Big(0), formatted: Big(0) };
  amount = "0";
  estimatedRevenue = "";
  modalForm: FormGroup = this.formBuilder.group({
    amount: [this.amount, [Validators.required, Validators.min(0.000000000000000018)]]
  });
  isConnected = false;
  approving = false;
  allowance = Big(0);
  constructor(private readonly formBuilder: FormBuilder, private readonly tokenService: TokenService, private readonly web3Service: Web3Service, private readonly buybackService: BuybackService) { }

  ngOnInit() {
    if(this.web3Service.accounts && this.web3Service.accounts.length > 0) {
      this.onChangeState(this.web3Service.accounts[0]);
    }
    this.web3Service.accountsObservable.subscribe(account => {
      this.onChangeState(account[0]);
    })
  }

  async onChangeState(account: string | undefined) {
    this.isConnected = account ? true : false;
    const balance = await this.tokenService.getBalance(this.tokenService.aboatContracts.get(24)!);
    this.walletBalance = { raw: balance, formatted: balance.div(10 ** 18).round(6, RoundingMode.RoundDown) }
    this.getAllowance();
  }

  async calculateEstimatedKai() {
    const result = await this.buybackService.totalAmount(Big(this.modalForm.get("amount")!.value).mul(10 ** 18));
    this.estimatedRevenue = result.div(10 ** 18).toFixed(4);
  }


  async approve() {
    if (this.approving) {
      return;
    }
    this.approving = true;
    this.buybackService.approve().then(result => {
      this.approving = false;
      this.getAllowance();
    });
  }

  getAllowance() {
    this.buybackService.getAllowance().then(allowance => {
      this.allowance = Big(allowance);
    });
  }

  setAmountToBalance() {
    const update = { amount: parseFloat(Big(this.walletBalance?.formatted).toFixed(18, RoundingMode.RoundDown)).toString() };
    this.modalForm.setValue(update);
  }

  async swap() {
    const result = await this.buybackService.swap(Big(this.modalForm.get("amount")!.value).mul(10 ** 18));
    this.onChangeState(this.web3Service.accounts);
  }

  async connectWallet() {
    this.web3Service.connect(true);
  }

}
