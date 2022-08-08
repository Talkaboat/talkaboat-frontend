import { Injectable } from '@angular/core';
import { bep20 } from 'src/constants/contracts/bep20';
import { factory } from 'src/constants/contracts/factory';
import { faucetAbi } from 'src/constants/contracts/faucet.contract';
import { masterEntertainerAbi } from 'src/constants/contracts/master-entertainer';
import { pair } from 'src/constants/contracts/pair';
import { registerAbi } from 'src/constants/contracts/register.contract';
import { rewardSystem } from 'src/constants/contracts/reward.contract';
import { router } from 'src/constants/contracts/router';
import { Web3Service } from '../web3.service';

@Injectable({ providedIn: 'root' })
export class ContractService {
  private readonly api = 'https://api.bscscan.com/api?module=contract&action=getabi&address={0}';
  private readonly routerContractAddress = '0xD48745E39BbED146eEC15b79cBF964884F9877c2';
  private readonly routerKAIContractAddress = '0xbafcdabe65a03825a131298be7670c0aec77b37f';
  private readonly factoryContractAddress = '0xb42e3fe71b7e0673335b3331b3e1053bd9822570';
  private readonly privateSaleContractAddress = '0x4A3584cF52B68f4a98353687Fc6C3193685F6AfB';
  private readonly masterEntertainerAddress = '0x764D2d3d50CdAf42BfA521Bf53BEE79859c8c6d4';
  private readonly factoryTestnetContractAddress = '0xb7926c0430afb07aa7defde6da862ae0bde767bc';
  private readonly factoryKAIMainnetContractAddress = '0xc9567a8b6b622cdc8076c6b4432ade0e11f50da1';
  private readonly routerTestnetContractAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
  private readonly masterEntertainerTestnetContractAddress = '0x7EED120eF26267691DbE7692ee326A0896D6cC2A';
  private readonly registerTestnetContractAddress = '0x0582dF774186fA5cD73a094022bD88A350649378';
  private readonly faucetTestnetContractAddress = '0x173248954B79BB666F6F88C8947eD7B2C2fc3714';
  private readonly rewardTestnetContractAddress = '0x77dC10eB4Ae7733571aAB05cEA6455C98dda5fC1';
  private readonly rewardTestnetKAIContractAddress = '0x77dC10eB4Ae7733571aAB05cEA6455C98dda5fC1';
  private readonly rewardKAIMainnetContractAddress = '0x77dC10eB4Ae7733571aAB05cEA6455C98dda5fC1';
  private readonly privateSaleTestnetContractAddress = '0xaC8227fA38E0fb3d10bAa32B077B6125E7ae4F2c';
  private readonly masterEntertainerKAIContractAddress = '0x319Cbc449E622Ef53b06dD1b720649207e5D13B4';
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
    switch (this.web3Service.chainId) {
      case 97: return this.masterEntertainerTestnetContractAddress;
      case 56: return this.masterEntertainerAddress;
      case 242: return this.masterEntertainerKAIContractAddress;
      case 24: return this.masterEntertainerKAIContractAddress;
    }
    return "";
  }

  getRouterAbi(): any {
    return router;
  }

  getRouterContractAddress(): string {
    switch (this.web3Service.chainId) {
      case 97: return this.routerTestnetContractAddress;
      case 56: return this.routerContractAddress;
      case 24: return this.routerKAIContractAddress;
    }
    return "";
  }

  public getRewardContractAddress(): string {
    switch (this.web3Service.chainId) {
      case 97: return this.rewardTestnetContractAddress;
      case 242: return this.rewardTestnetKAIContractAddress;
      case 24: return this.rewardKAIMainnetContractAddress;
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

  getFactoryContractAddress(): string {
    switch (this.web3Service.chainId) {
      case 97: return this.factoryTestnetContractAddress;
      case 56: return this.factoryContractAddress;
      case 24: return this.factoryKAIMainnetContractAddress;
    }
    return "";
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

  public getRegisterContract() {
    if (!this.web3Service.web3) {
      return undefined;
    }
    var address = "";
    switch (this.web3Service.chainId) {
      case 97: address = this.registerTestnetContractAddress;
    }
    return new this.web3Service.web3.eth.Contract(registerAbi, address);
  }

  public getFaucetContract() {
    if (!this.web3Service.web3) {
      return undefined;
    }
    var address = "";
    switch (this.web3Service.chainId) {
      case 97: address = this.faucetTestnetContractAddress;
    }
    return new this.web3Service.web3.eth.Contract(faucetAbi, address);
  }
}
