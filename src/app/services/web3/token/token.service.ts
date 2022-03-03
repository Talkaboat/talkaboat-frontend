import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Big, { RoundingMode } from 'big.js';
import { BLOCKCHAIN } from 'src/constants/blockchain.constants';
import { PoolInfo } from '../../repository/smart-contract-repository/models/pool-info.model';
import { TokenModel } from '../../repository/smart-contract-repository/models/token.model';
import { ContractService } from '../contract/contract.service';
import { Web3Service } from '../web3.service';
@Injectable()
export class TokenService {

  tokens: TokenModel[] = [];
  readonly wbnbContract = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c".toLowerCase();
  readonly aboatContract = "0x50Fa913d111099C78Ec25c1e0B1D98566C80886C".toLowerCase();
  readonly stableCoins = [
    "0x97731fCA94A1a3d0392f9Be6ff030f8047669ae0".toLowerCase()
  ]
  public BUSD: TokenModel = { name: "USDT Token", symbol: "USDT", decimals: 18, balance: Big(0), address: "0x97731fCA94A1a3d0392f9Be6ff030f8047669ae0", priceInBusd: 1, swapAmount: Big(0) };
  constructor(private readonly contractService: ContractService, private readonly web3Service: Web3Service, private readonly http: HttpClient) { }

  isStableUSD(tokenAddress: string | undefined): boolean {
    return tokenAddress != undefined && this.stableCoins.includes(tokenAddress.toLowerCase());
  }

  public async addToken(token: TokenModel, calculatePrice = true, calculateTokenBalance = true): Promise<TokenModel | undefined> {
    let temp: TokenModel | undefined = this.tokens.find(el => el.address?.toLowerCase() == token?.address?.toLowerCase());
    if (temp) {
      this.tokens.push(token);
      temp = token;
    }
    if (calculatePrice) {
      if (this.isStableUSD(token.address)) {
        token.priceInBusd = 1;
      } else {
        token.priceInBusd = await this.getQuote(token, this.BUSD, Big(1));
      }
    }
    return Promise.resolve(token);
  }

  public async addTokenByIdentifier(identifier: string, calculatePrice = true, calculateTokenBalance = false, replaceWbnb = false): Promise<TokenModel | undefined> {
    if (!identifier) {
      return undefined;
    }
    identifier = identifier.toLowerCase();
    if (replaceWbnb && identifier === 'wbnb' || identifier === this.wbnbContract) {
      identifier = 'bnb';
    }
    let temp: TokenModel | undefined = this.tokens.find(el => el.address?.toLowerCase() == identifier || el.symbol.toLowerCase() == identifier);
    if (temp == undefined && identifier.startsWith('0x')) {
      const decimals = await this.getDecimal(identifier);
      const name = await this.getName(identifier);
      let symbols = (await this.getSymbol(identifier, undefined))
      if (decimals && name && symbols) {
        const symbol = symbols[0];
        return this.addToken({ name, symbol, decimals, address: identifier });
      }
    }
    if (temp != undefined) {
      return this.addToken(temp, calculatePrice, calculateTokenBalance)
    }
    return Promise.resolve(undefined);

  }

  public getQuote(tokenA: TokenModel, tokenB: TokenModel, swapAmount: Big = Big(0)): Promise<number> {
    if (tokenA && swapAmount.lte(0) && tokenA.swapAmount) {
      swapAmount = Big(tokenA.swapAmount);
    }
    if (!swapAmount || !tokenA || !tokenA.decimals || !tokenB || tokenA.name == "WaultSwap LP" || tokenB.name == "WaultSwap LP" || swapAmount.lte(0)) {
      return Promise.resolve(0);
    }
    const amount = swapAmount.mul((10 ** tokenA?.decimals));
    // switch (this.web3Service.chainId) {
    //   case 56: return this.getQuoteBSCMainnet(tokenA, tokenB, amount);
    //   case 97: return this.getQuoteBySmartContract(tokenA, tokenB, amount);
    // }
    return Promise.resolve(0.000015);
  }

  private getWETH(): Promise<string> {
    const router = this.contractService.getRouterContract();
    return router.methods.WETH().call();
  }

  public async getAboatToken(): Promise<TokenModel | undefined> {
    return this.addTokenByIdentifier(this.aboatContract, true);
  }

  private async getQuoteBySmartContract(tokenA: TokenModel, tokenB: TokenModel, amount: Big): Promise<number> {
    const factory = this.contractService.getFactoryContract();
    const addressA = tokenA.symbol == "BNB" ? await this.getWETH() : tokenA.address;
    const addressB = tokenB.symbol == "BNB" ? await this.getWETH() : tokenB.address;
    const pairAddress = await factory.methods.getPair(addressA, addressB).call();
    if (pairAddress == BLOCKCHAIN.ZERO_ADDRESS) {
      return 0;
    }
    const pair = this.contractService.getLpContract(pairAddress);
    const reserves = await pair.methods.getReserves().call();
    const token0 = await pair.methods.token0().call();
    const isTokenAToken0 = token0.toLowerCase() == addressA!.toLowerCase();
    const quote = await this.contractService.getRouterContract().methods.quote(
      amount,
      isTokenAToken0 ? reserves._reserve0 : reserves._reserve1,
      isTokenAToken0 ? reserves._reserve1 : reserves._reserve0
    ).call();
    return quote / (10 ** tokenB.decimals);
  }

  private getQuoteBSCMainnet(tokenA: TokenModel, tokenB: TokenModel, amount: Big): Promise<number> {
    return Promise.resolve(0.000015);
  }


  public getName(tokenAddress: string): Promise<string> {
    if (tokenAddress == BLOCKCHAIN.ZERO_ADDRESS) {
      return Promise.resolve("ZERO_ADDRESS");
    }
    return this.contractService.getTokenContract(tokenAddress)?.methods.name().call();
  }

  public async getNames(lpAddress: string) {
    const addresses = await this.getTokenAddressFromLpAddress(lpAddress);
    return [
      await this.getName(addresses[0]),
      await this.getName(addresses[1])
    ]
  }

  public async getSymbols(lpAddress: string) {
    const addresses = await this.getTokenAddressFromLpAddress(lpAddress);
    return [
      await this.getSymbol(addresses[0], undefined),
      await this.getSymbol(addresses[1], undefined)
    ]
  }

  public async approveContract(spender: string, tokenAddress: string, owner: string = '') {
    if (!owner || owner == '') {
      owner = this.web3Service.accounts && this.web3Service.accounts?.length > 0 ? this.web3Service.accounts[0] : "";
    }
    const method = this.contractService.getTokenContract(tokenAddress)?.methods.approve(spender, BLOCKCHAIN.MaxUint256.toFixed(0, RoundingMode.RoundDown));
    const gas = await this.web3Service.getEstimatedGas(method, owner);
    return method.send({ from: owner, gas: gas }).then((_: any) => {
      return Promise.resolve(true);
    });

  }

  public getBalance(tokenAddress: string, owner = undefined): Promise<Big> {
    if (!this.web3Service.accounts && owner == undefined) {
      return Promise.resolve(Big(0));
    }
    return this.contractService.getTokenContract(tokenAddress)?.methods.balanceOf(owner ? owner : this.web3Service.accounts[0]).call().then((balance: Big) => {
      return Big(balance);
    }).catch((_: any) => {
      return Big(0);
    });
  }

  public getDecimal(tokenAddress: string): Promise<any> {
    return this.contractService.getTokenContract(tokenAddress)?.methods.decimals().call().catch((_: string) => {
      return 18;
    });
  }

  public getSymbol(tokenAddress: string, poolInfo: PoolInfo | undefined): Promise<string[]> {
    return this.contractService.getTokenContract(tokenAddress)?.methods.symbol().call().then((name: string) => {
      let convertedName = name.toLowerCase();
      if (convertedName.includes("wlp") || convertedName.includes("cake-lp")) {
        return poolInfo ? this.getSymbolFromPoolInfo(poolInfo) : this.getSymbols(tokenAddress);
      } else {
        let symbols = [];
        symbols.push(name);
        return symbols;
      }
    }).catch((_: any) => {
      return "NAN";
    });
  }

  public getTokenAddressFromPoolInfo(poolInfo: PoolInfo): Promise<string[]> {
    let lpAddress = poolInfo.lpToken;
    poolInfo.addresses = [];
    return this.contractService.getLpContract(lpAddress)?.methods.token0().call().then((token0: string) => {
      poolInfo.addresses.push(token0);
      return this.contractService.getLpContract(lpAddress)?.methods.token1().call().then((token1: string) => {
        poolInfo.addresses.push(token1);
        return poolInfo.addresses;
      });
    });
  }

  public getTotalSupply(address: string): Promise<Big> {
    return this.contractService.getTokenContract(address)?.methods.totalSupply().call().then(async (result: Big) => {
      return result.div(10 ** await this.getDecimal(address));
    });
  }

  public async getTokenAddressFromLpAddress(lpAddress: string): Promise<string[]> {
    return [
      await this.contractService.getLpContract(lpAddress)?.methods.token0().call(),
      await this.contractService.getLpContract(lpAddress)?.methods.token1().call()
    ];
  }

  public getSymbolFromPoolInfo(poolInfo: PoolInfo): Promise<string[]> {
    if (!poolInfo) {
      return Promise.resolve([]);
    }
    return this.getTokenAddressFromPoolInfo(poolInfo).then(addresses => {
      if (!addresses || addresses.length < 2) {
        return [];
      }
      return this.getSymbol(addresses[0], poolInfo).then(symbolA => {

        let symbols: string[] = [];
        symbols.push(symbolA[0]);
        return this.getSymbol(addresses[1], poolInfo).then(symbolB => {
          symbols.push(symbolB[0]);
          return symbols;
        });
      });
    });
  }


  getTokenFromAddress(address: string): Promise<TokenModel | undefined> {
    if (address) {
      let temp: TokenModel | undefined;
      if ((temp = this.tokens.find(el => el.address?.toLowerCase() == address.toLowerCase()))) {
        return Promise.resolve(temp);
      } else {
        return this.getDecimal(address).then(decimals => {
          return this.getName(address).then(name => {
            return this.getSymbol(address, undefined).then(symbol => {
              return this.addToken({ name, decimals, symbol, address });
            });
          });
        });
      }
    }
    return Promise.resolve(undefined);
  }

  public getAllowance(owner: string, spender: string, tokenAddress: string): Promise<Big> {
    if (!owner) {
      owner = this.web3Service.accounts && this.web3Service.accounts?.length > 0 ? this.web3Service.accounts[0] : "";
    }
    if (!owner) {
      return Promise.resolve(Big(0));
    }
    return this.contractService.getTokenContract(tokenAddress)?.methods.allowance(owner ? owner : this.web3Service.accounts[0], spender).call().then((allowance: Big) => {
      return allowance;
    }).catch((error: any) => {
      return Big(0);
    });
  }
}
