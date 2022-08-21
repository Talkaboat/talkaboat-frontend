import { Injectable } from '@angular/core';
import Big from 'big.js';
import { UserService } from '../../user/user.service';
import { ContractService } from '../contract/contract.service';
import { Web3Service } from '../web3.service';

@Injectable({
  providedIn: 'root'
})
export class VestingService {

  constructor(private readonly contractService: ContractService, private readonly web3: Web3Service, private readonly userService: UserService) { }

  async claim(type: string) : Promise<boolean> {
    if(!this.userService.isUserLoggedIn()) {
      return Promise.resolve(false);
    }
    const contract = this.contractService.getVestingContract(type);
    if(!contract) {
      return Promise.resolve(false);
    }
    const method = contract.methods.claim();
    const from = this.web3.accounts[0];
    const gas = await this.web3.getEstimatedGas(method, from);
    return method.send({from: from, gas: gas});
  }

  totalAmount(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return contract.methods.bought(from).call();
  }

  claimedAmount(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return contract.methods.claimedTokens(from).call();
  }

  claimedPercentage(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return contract.methods.claimed(from).call();
  }


  getCurrentPercentage(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return contract.methods.getCurrentPercentage().call();


  }
}
