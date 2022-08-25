import { Injectable } from '@angular/core';
import { bep20 } from 'src/constants/contracts/bep20';
import { factory } from 'src/constants/contracts/factory';
import { masterEntertainerAbi } from 'src/constants/contracts/master-entertainer';
import { pair } from 'src/constants/contracts/pair';
import { rewardSystem } from 'src/constants/contracts/reward.contract';
import { router } from 'src/constants/contracts/router';
import { vestingAbi } from 'src/constants/contracts/vesting';
import { Web3Service } from '../web3.service';

@Injectable({ providedIn: 'root' })
export class ContractService {
  private readonly api = 'https://api.bscscan.com/api?module=contract&action=getabi&address={0}';
  readonly routerContracts = new Map<number, string>([
    [24, "0xbafcdabe65a03825a131298be7670c0aec77b37f".toLowerCase()],
    [80001, "0xbdd4e5660839a088573191A9889A262c0Efc0983".toLowerCase()],
    [137, "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff".toLowerCase()],
    //[9000, "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff".toLowerCase()]
  ]);
  readonly factoryContracts = new Map<number, string>([
    [24, "0xc9567a8b6b622cdc8076c6b4432ade0e11f50da1".toLowerCase()],
    [80001, "0x69004509291F4a4021fA169FafdCFc2d92aD02Aa".toLowerCase()],
    [137, "0x69004509291F4a4021fA169FafdCFc2d92aD02Aa".toLowerCase()],
    //[9000, "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff".toLowerCase()]
  ]);
  readonly masterEntertainerContracts = new Map<number, string>([
    // [24, "0x319Cbc449E622Ef53b06dD1b720649207e5D13B4".toLowerCase()],
    [80001, "0x50Fa913d111099C78Ec25c1e0B1D98566C80886C".toLowerCase()],
    [137, "0x50Fa913d111099C78Ec25c1e0B1D98566C80886C".toLowerCase()],
    [9000, "0x013b705e27F21EdC2040465841439bb65575b2DC".toLowerCase()]
  ]);
  readonly rewardSystemContracts = new Map<number, string>([
    [24, "0x77dC10eB4Ae7733571aAB05cEA6455C98dda5fC1".toLowerCase()],
    [80001, "0x31e9204c50Ce886638c1746a86e478f62f55B68D".toLowerCase()],
    [137, "0x31e9204c50Ce886638c1746a86e478f62f55B68D".toLowerCase()],
    [9000, "0xF9CEe3BF737431A86F2021B98e8c6D09F2B77098".toLowerCase()]
  ]);
  readonly vestingContracts = new Map<number, Map<string, string>>([

    [24, new Map<string, string>([
      ["seed", "0x7659478eeab597574910402FC46697Bd115c14a2".toLowerCase()],
      ["lucky", "0xDc6503f8dF758b6693ba6f25F9de9AEb1a8EBbb3".toLowerCase()],
      ["public", "0x30764AC6245813C686F179829578BcbD03180dF3".toLowerCase()],
      ["advisor", "0x11B12c99B99F31Be74B5D65858c76C69f31E054A".toLowerCase()],
      ["marketing", "0xabA21dA0b2676A067eE1e3D26b1D0f559aeFDf6c".toLowerCase()],
      ["team", "0xFe25425ca70484CdE2834475Bb1601891AcF8Ab1".toLowerCase()],
    ])]
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

  getVestingAbi(): any {
    return vestingAbi;
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
  public getVestingContractAddress(type: string) {
    if(this.vestingContracts.get(this.web3Service.chainId)) {
      return this.vestingContracts.get(this.web3Service.chainId)?.get(type)!;
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

  public getVestingContract(type: string) {
    if (!this.web3Service.web3) {
      return undefined;
    }
    const contractAddress = this.getVestingContractAddress(type);
    console.log(contractAddress);
    return contractAddress ? new this.web3Service.web3.eth.Contract(this.getVestingAbi(), contractAddress) : undefined;
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
