import { Injectable } from '@angular/core';
import Big from 'big.js';
import { BLOCKCHAIN } from 'src/constants/blockchain.constants';
import { PoolInfo } from '../../repository/smart-contract-repository/models/pool-info.model';
import { ContractService } from '../contract/contract.service';
import { TokenService } from '../token/token.service';
import { Web3Service } from '../web3.service';

@Injectable()
export class LoungeService {

  tokenPerBlock: Big = Big(0);
  totalAllocation: Big = Big(0);

  constructor(private readonly contractService: ContractService, private readonly web3Service: Web3Service, private readonly tokenService: TokenService) { }

  approve(poolInfo: PoolInfo): Promise<boolean> {
    return this.tokenService.approveContract(this.contractService.getMasterEntertainerContractAddress(), poolInfo.lpToken);
  }

  async harvest(poolInfo: PoolInfo): Promise<any> {
    const method = this.contractService.getMasterEntertainerContract()?.methods.claim(poolInfo.id);
    const from = this.web3Service.accounts[0];
    const gas = await this.web3Service.getEstimatedGas(method, from);
    return method.send({ from: this.web3Service.accounts[0], gas: gas });
  }

  getAllowance(poolInfo: PoolInfo) {
    return this.tokenService.getAllowance('', this.contractService.getMasterEntertainerContractAddress(), poolInfo.lpToken);
  }

  getReserves(address: string): Promise<any> {
    return this.contractService.getLpContract(address)?.methods?.getReserves().call();
  }

  getTokenPerBlock(): Promise<Big> {
    return this.contractService.getMasterEntertainerContract()?.methods.coinPerBlock().call();
  }

  getTotalAllocation(): Promise<Big> {
    return this.contractService.getMasterEntertainerContract()?.methods.totalAllocPoint().call();
  }

  public getPendingCoin(index: number): Promise<Big> {
    if (this.web3Service.accounts && this.web3Service.accounts.length > 0) {
      return this.contractService.getMasterEntertainerContract()?.methods.pendingCoin(index, this.web3Service.accounts[0]).call();
    }
    return Promise.resolve(Big(0));
  }

  public getUserInfo(index: number): Promise<any> {
    if (this.web3Service.accounts && this.web3Service.accounts.length > 0) {
      return this.contractService.getMasterEntertainerContract()?.methods.userInfos(index, this.web3Service.accounts[0]).call();
    }
    return Promise.resolve(Big(0));
  }

  async getTotalLiquidity(lpToken: string): Promise<Big> {
    return Big(await this.contractService.getLpContract(lpToken).methods.totalSupply().call());
  }

  public async updatePools(poolInfos: PoolInfo[]) {
    this.tokenPerBlock = await this.getTokenPerBlock();
    this.totalAllocation = await this.getTotalAllocation();
    let tasks: Promise<PoolInfo>[] = [];
    poolInfos.forEach((pool: PoolInfo) => {
      tasks.push(this.setupPool(pool));
    });
    await Promise.all(tasks);
  }

  private async setupStandardPoolVariables(poolInfo: PoolInfo, gotAccountWallet: boolean): Promise<any> {
    var processes = [];
    if (gotAccountWallet) {
      processes.push(this.getPendingCoin(poolInfo.id).then((rawPending: Big) => {
        poolInfo.rawPending = Big(rawPending);
      }));
      processes.push(this.getUserInfo(poolInfo.id).then(userInfo => {
        poolInfo.userInfo = userInfo;
      }));
      processes.push(this.tokenService.getAllowance(this.web3Service.accounts[0], this.contractService.getMasterEntertainerContractAddress(), poolInfo.lpToken)
        .then(allowance => {
          poolInfo.allowance = Big(allowance);
        }));
    }else {
      poolInfo.userInfo = { amount: Big(0), rewardDebt: Big(0), lastDeposit: Big(0) };
      poolInfo.allowance = Big(0);
      poolInfo.rawPending = Big(0);
    }
    await Promise.all(processes);
    if (!poolInfo.depositFee) {
      poolInfo.depositFee = Big(0);
    }
    poolInfo.rawAmount = Big(poolInfo.userInfo.amount);
    poolInfo.amount = poolInfo.rawAmount.div(10 ** poolInfo.decimals);
    poolInfo.lastDeposit = this.timeConverter(Number(poolInfo.userInfo.lastDeposit));
    poolInfo.withdrawalDate = poolInfo.userInfo.lastDeposit > 0 && poolInfo.lockPeriod > 0 ? this.timeConverter(Number(poolInfo.userInfo.lastDeposit), Number(poolInfo.lockPeriod)) : undefined;
    if (poolInfo.withdrawalDate) {
      poolInfo.withdrawalTimestamp = poolInfo.userInfo.lastDeposit && poolInfo.lockPeriod > 0 ? new Date(poolInfo.withdrawalDate).getTime() : undefined;
    }
    poolInfo.rawRewardDebt = Big(poolInfo.userInfo.rewardDebt);
    poolInfo.rewardDebt = Number(poolInfo.rawRewardDebt.div(10 ** 18));
    poolInfo.pending = poolInfo.rawPending.div(10 ** 18).round(6);
    poolInfo.liquidity = Big(poolInfo.depositedCoins).div(10 ** Number(poolInfo.decimals)).round(3);
    return poolInfo;
  }

  public async setupPool(poolInfo: PoolInfo): Promise<PoolInfo> {
    const gotAccountWallet = this.web3Service.accounts && this.web3Service.accounts.length > 0;
    poolInfo = await this.setupStandardPoolVariables(poolInfo, gotAccountWallet);
    poolInfo = await this.getPoolLiquidity(poolInfo);
    let rewardPerAllocation = Big(this.tokenPerBlock).div(10 ** 18).div(this.totalAllocation);

    poolInfo.yearlyTokenReward = new Big(rewardPerAllocation).mul(poolInfo.allocPoint).mul(BLOCKCHAIN.BLOCKS_PER_DAY).mul(360);
    const aboatToken = await this.tokenService.getAboatToken();
    if (aboatToken) {

      const priceInBusd = new Big(aboatToken.priceInBusd!);
      const yearlyTokenRewardInBusd = poolInfo.yearlyTokenReward.times(priceInBusd);
      poolInfo.apr = yearlyTokenRewardInBusd.div((poolInfo.totalLiquidity?.gt(1) ? poolInfo.totalLiquidity : new Big(1))).times(new Big(100)).round(2);
    }
    return poolInfo;
  }

  async getPoolLiquidity(poolInfo: PoolInfo) {
    if (this.tokenService.isStableUSD(poolInfo.lpToken)) {
      poolInfo = await this.getStableCoinLiquidity(poolInfo);
    } else if (poolInfo.addresses?.length >= 2) {
      poolInfo = await this.getLpLiquidity(poolInfo);
    } else {
      poolInfo = await this.getStakeLiquidity(poolInfo);
    }
    return poolInfo;
  }

  async getStableCoinLiquidity(poolInfo: PoolInfo) {
    var processes = [];

    if (poolInfo.tokenA) {
      processes.push(this.tokenService.addToken(poolInfo.tokenA, false, false).then(token => poolInfo.tokenA = token));
    } else {
      processes.push(this.tokenService.addTokenByIdentifier(poolInfo.lpToken, false, false).then(token => poolInfo.tokenA = token));
    }
    poolInfo.price = 1;
    poolInfo.totalLiquidity = poolInfo.liquidity;

    await Promise.all(processes);
    return poolInfo;
  }

  async getLpLiquidity(poolInfo: PoolInfo) {
    //Liquidity Pool
    var processes = [];
    let reserves: any;
    if (poolInfo.tokenA) {
      processes.push(this.tokenService.addToken(poolInfo.tokenA, true, false).then(token => poolInfo.tokenA = token));
    } else {
      processes.push(this.tokenService.addTokenByIdentifier(poolInfo.addresses[0], true, false).then(token => poolInfo.tokenA = token));
    }
    if (poolInfo.tokenB) {
      processes.push(this.tokenService.addToken(poolInfo.tokenB, true, false).then(token => poolInfo.tokenB = token));
    } else {
      processes.push(this.tokenService.addTokenByIdentifier(poolInfo.addresses[1], true, false).then(token => poolInfo.tokenA = token));
    }
    processes.push(this.getTotalLiquidity(poolInfo.lpToken).then(result => poolInfo.totalLiquidity = Big(result).div(10 ** poolInfo.decimals)));
    processes.push(this.getReserves(poolInfo.lpToken).then(result => reserves = result));
    await Promise.all(processes);
    if (reserves && poolInfo.tokenA && poolInfo.tokenB && poolInfo.tokenA.priceInBusd && poolInfo.tokenB.priceInBusd) {
      let totalA = Big(reserves._reserve0).div(10 ** poolInfo.tokenA.decimals).mul(poolInfo.tokenA.priceInBusd);
      let totalB = Big(reserves._reserve1).div(10 ** poolInfo.tokenB.decimals).mul(poolInfo.tokenB.priceInBusd);
      poolInfo.price = Number((totalA.add(totalB)).div(poolInfo.totalLiquidity));
      poolInfo.totalLiquidity = Big(poolInfo.liquidity).mul(poolInfo.price);
    }
    return poolInfo;
  }

  async getStakeLiquidity(poolInfo: PoolInfo) {
    let poolToken = (await this.tokenService.addToken(poolInfo.tokenA!, true, false))!;
    poolInfo.tokenA = poolToken;
    poolInfo.totalLiquidity = Big(poolInfo.liquidity).mul(poolToken.priceInBusd!);
    poolInfo.price = poolToken.priceInBusd;
    return poolInfo;
  }

  public timeConverter(timestamp: number, additionalDays: number = 0){
    var a = new Date(timestamp * 1000);
    a.setDate(a.getDate() + additionalDays);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

}
