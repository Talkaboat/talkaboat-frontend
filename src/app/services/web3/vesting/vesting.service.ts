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
    var gas = "";
    try {
    gas = await this.web3.getEstimatedGas(method, from);
    } catch(error) {
      return Promise.reject(error);
    }

    return method.send({from: from, gas: gas});
  }

  async totalAmount(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return Big(await contract.methods.bought(from).call());
  }

  async claimedAmount(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return Big(await contract.methods.claimedTokens(from).call());
  }

  async claimedPercentage(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return Big(await contract.methods.claimed(from).call());
  }


  async getCurrentPercentage(type: string): Promise<Big> {
    const contract = this.contractService.getVestingContract(type);
    const from = this.web3.accounts[0];
    if(!contract || !from) {
      return Promise.resolve(Big(0));
    }
    return Big(await contract.methods.getCurrentPercentage().call());


  }
}
