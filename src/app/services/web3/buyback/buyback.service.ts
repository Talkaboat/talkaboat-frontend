import { Injectable } from '@angular/core';
import Big from 'big.js';
import { UserService } from '../../user/user.service';
import { ContractService } from '../contract/contract.service';
import { TokenService } from '../token/token.service';
import { Web3Service } from '../web3.service';

@Injectable({
  providedIn: 'root'
})
export class BuybackService {

  constructor(private readonly contractService: ContractService, private readonly web3: Web3Service, private readonly tokenService: TokenService) { }

  async totalAmount(amount: Big): Promise<Big> {
    const contract = this.contractService.getBuybackContract();
    return Big(await contract.methods.getRewardAmountFromPayment(amount.toFixed(0, Big.roundDown)).call());
  }

  async swap(amount: Big): Promise<any> {
    const contract = this.contractService.getBuybackContract();
    const method = contract.methods.buy(amount.toFixed(0, Big.roundDown))
    const from = this.web3.accounts && this.web3.accounts?.length > 0 ? this.web3.accounts[0] : "";
    const gas = (await this.web3.getEstimatedGas(method, from));
    return await method.send({ from, gas});
  }

  getAllowance() {
    return this.tokenService.getAllowance('', this.contractService.buybackContractAddress, this.tokenService.aboatContracts.get(24)!);
  }

  approve(): Promise<boolean> {
    return this.tokenService.approveContract(this.contractService.buybackContractAddress, this.tokenService.aboatContracts.get(24)!);
  }

}
