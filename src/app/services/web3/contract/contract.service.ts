import { Injectable } from '@angular/core';
import { bep20 } from 'src/constants/contracts/bep20';
import { factory } from 'src/constants/contracts/factory';
import { masterEntertainerAbi } from 'src/constants/contracts/master-entertainer';
import { pair } from 'src/constants/contracts/pair';
import { rewardSystem } from 'src/constants/contracts/reward.contract';
import { router } from 'src/constants/contracts/router';
import { Web3Service } from '../web3.service';

@Injectable({ providedIn: 'root' })
export class ContractService {
  private readonly api = 'https://api.bscscan.com/api?module=contract&action=getabi&address={0}';
  readonly routerContracts = new Map<number, string>([
    [24, "0xbafcdabe65a03825a131298be7670c0aec77b37f".toLowerCase()],
    [80001, "0xbdd4e5660839a088573191A9889A262c0Efc0983".toLowerCase()]
  ]);
  readonly factoryContracts = new Map<number, string>([
    [24, "0xc9567a8b6b622cdc8076c6b4432ade0e11f50da1".toLowerCase()],
    [80001, "0x69004509291F4a4021fA169FafdCFc2d92aD02Aa".toLowerCase()]
  ]);
  readonly masterEntertainerContracts = new Map<number, string>([
    [24, "0x319Cbc449E622Ef53b06dD1b720649207e5D13B4".toLowerCase()],
    [80001, "0xDcA93da4C19ec94433EDB14c4EDF7e0b736461Ee".toLowerCase()]
  ]);
  readonly rewardSystemContracts = new Map<number, string>([
    [24, "0x77dC10eB4Ae7733571aAB05cEA6455C98dda5fC1".toLowerCase()],
    [80001, "0x6399C7CF7D72332645A27422bEBB8Cf0523B0229".toLowerCase()]
  ]);

  constructor(private readonly web3Service: Web3Service) { }

  private getStandardTokenAbi(): any {
    return bep20;
  }

  getStandardLpAbi(): any {
    return pair;
  }

  getMasterEntertainerAbi(): any {
    return masterEntertainerAbi;
  }

  getMasterEntertainerContractAddress(): string {
    if(this.masterEntertainerContracts.get(this.web3Service.chainId)) {
      return this.masterEntertainerContracts.get(this.web3Service.chainId)!;
    }
    return "";
  }

  getRouterAbi(): any {
    return router;
  }

  getRouterContractAddress(): string {
    if(this.routerContracts.get(this.web3Service.chainId)) {
      return this.routerContracts.get(this.web3Service.chainId)!;
    }
    return "";
  }

  public getRewardContractAddress(): string {
    if(this.rewardSystemContracts.get(this.web3Service.chainId)) {
      return this.rewardSystemContracts.get(this.web3Service.chainId)!;
    }
    return "";
  }

  getFactoryContractAddress(): string {
    if(this.factoryContracts.get(this.web3Service.chainId)) {
      return this.factoryContracts.get(this.web3Service.chainId)!;
    }
    return "";
  }

  public getRewardContract() {
    if (!this.web3Service.web3) {
      return undefined;
    }
    const contractAddress = this.getRewardContractAddress();
    return contractAddress ? new this.web3Service.web3.eth.Contract(rewardSystem, contractAddress) : undefined;
  }

  getFactoryAbi(): any {
    return factory;
  }



  public getMasterEntertainerContract() {
    if (!this.web3Service.web3) {
      return undefined;
    }
    const contractAddress = this.getMasterEntertainerContractAddress();
    return contractAddress ? new this.web3Service.web3.eth.Contract(this.getMasterEntertainerAbi(), contractAddress) : undefined;
  }

  public getFactoryContract() {
    if (!this.web3Service.web3) {
      return undefined;
    }
    const contractAddress = this.getFactoryContractAddress();
    return contractAddress ? new this.web3Service.web3.eth.Contract(this.getFactoryAbi(), contractAddress) : undefined;
  }

  public getRouterContract() {
    if (!this.web3Service.web3) {
      return undefined;
    }
    const contractAddress = this.getRouterContractAddress();
    return contractAddress ? new this.web3Service.web3.eth.Contract(this.getRouterAbi(), contractAddress) : undefined;
  }

  public getTokenContract(address: string) {
    if (!this.web3Service.web3) {
      return undefined;
    }
    return new this.web3Service.web3.eth.Contract(this.getStandardTokenAbi(), address);
  }

  public getLpContract(address: string) {
    if (!this.web3Service.web3) {
      return undefined;
    }
    return new this.web3Service.web3.eth.Contract(this.getStandardLpAbi(), address);
  }
}
