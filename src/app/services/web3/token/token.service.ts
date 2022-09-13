import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Big, { RoundingMode } from 'big.js';
import { BLOCKCHAIN } from 'src/constants/blockchain.constants';
import { PoolInfo } from '../../repository/smart-contract-repository/models/pool-info.model';
import { TokenModel } from '../../repository/smart-contract-repository/models/token.model';
import { ContractService } from '../contract/contract.service';
import { Web3Service } from '../web3.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokens: TokenModel[] = [];
  readonly wethContracts = new Map<number, string>([
    [24, "0xAF984E23EAA3E7967F3C5E007fbe397D8566D23d".toLowerCase()],
    [80001, "0x462C98Cae5AffEED576c98A55dAA922604e2D875".toLowerCase()],
    [137, "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270".toLowerCase()],
    [9000, "0x0b67B0A0Ed150B9F06e0ee90D2f1d3c4b3016D5D".toLowerCase()]
  ]);
  readonly aboatContracts = new Map<number, string>([
    [24, "0x186B1B6CE63932a34FAa8D08bB11B775591Fd6f4".toLowerCase()],
    [242, "0x5fddDc6a283459B8faCe7C97606c94a0182EAEb8".toLowerCase()],
    [80001, "0x4Ed73822C3c7986F11B3DBc6adbad0f0F01ff676".toLowerCase()],
    [137, "0x9BBF7aC8151f990294D29174a9d3a3272a87449b".toLowerCase()],
    [9000, "0x9BBF7aC8151f990294D29174a9d3a3272a87449b".toLowerCase()]
  ]);
  readonly stableCoinContracts = new Map<number, string[]>([
    [24, ["0x186B1B6CE63932a34FAa8D08bB11B775591Fd6f4".toLowerCase()]],
    [80001, ["0x0fa8781a83e46826621b3bc094ea2a0212e71b23".toLowerCase()]],
    [137, ["0x0fa8781a83e46826621b3bc094ea2a0212e71b23".toLowerCase()]],
    [9000, ["0x56319B93cc71952c11Cf0FF6b13Ba418614eB648".toLowerCase()]]
  ]);
  readonly gasIdentifiers = new Map<number, string>([
    [24, "KAI"],
    [80001, "MATIC"],
    [137, "MATIC"],
    [9000, "tEVMOS"]
  ]);
  readonly usdtTokens = new Map<number, TokenModel>([
    [24, { name: "USDT Token", symbol: "USDT", decimals: 18, balance: Big(0), address: "0x551A5dcAC57C66aA010940c2dcFf5DA9c53aa53b", priceInBusd: 1, swapAmount: Big(0) }],
    [137, { name: "USDT Token", symbol: "USDT", decimals: 18, balance: Big(0), address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", priceInBusd: 1, swapAmount: Big(0) }],
    [9000, { name: "USDT Token", symbol: "USDT", decimals: 18, balance: Big(0), address: "0x56319B93cc71952c11Cf0FF6b13Ba418614eB648", priceInBusd: 1, swapAmount: Big(0) }],
  ]);
  constructor(private readonly contractService: ContractService, private readonly web3Service: Web3Service, private readonly http: HttpClient) { }

  isStableUSD(tokenAddress: string | undefined): boolean {
    var chain = this.web3Service.chainId;
    if(this.stableCoinContracts && this.stableCoinContracts.get(chain)) {
      return tokenAddress != undefined && this.stableCoinContracts &&  this.stableCoinContracts.get(chain)!.includes(tokenAddress.toLowerCase());
    }
    return false;
  }

  getCurrentGasToken(): string {
    return this.gasIdentifiers.get(this.web3Service.chainId) ?? "Not allowed!";
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
        var chain = this.web3Service.chainId;
        var usdt = this.usdtTokens!.get(chain);
        token.priceInBusd = usdt ? await this.getQuote(token, usdt, Big(1)): 0;
      }
    }
    return Promise.resolve(token);
  }

  public async addTokenByIdentifier(identifier: string, calculatePrice = true, calculateTokenBalance = false, replaceWbnb = false): Promise<TokenModel | undefined> {
    if (!identifier) {
      return undefined;
    }
    identifier = identifier.toLowerCase();
    var chain = this.web3Service.chainId;
    var wethContract = this.wethContracts!.get(chain)!;
    if (replaceWbnb && identifier === 'wkai' || identifier === wethContract) {
      identifier = 'kai';
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
    if (!swapAmount || !tokenA || !tokenA.decimals || !tokenB || tokenA.name.includes("LP") || tokenB.name.includes("LP")|| swapAmount.lte(0)) {
      return Promise.resolve(0);
    }
    const amount = swapAmount.mul((10 ** tokenA?.decimals));
    switch (this.web3Service.chainId) {
      case 24: return this.getQuoteBySmartContract(tokenA, tokenB, amount);
    }
    return Promise.resolve(0.000018);
  }

  public async getAboatToken(): Promise<TokenModel | undefined> {
    var chain = this.web3Service.chainId;

    return this.addTokenByIdentifier(this.aboatContracts.get(chain)!, true);
  }

  private async getQuoteBySmartContract(tokenA: TokenModel, tokenB: TokenModel, amount: Big): Promise<number> {
    var chain = this.web3Service.chainId;
    const factory = this.contractService.getFactoryContract();
    const addressA = tokenA.symbol == this.gasIdentifiers!.get(chain) ? await this.aboatContracts.get(chain)! : tokenA.address;
    const addressB = tokenB.symbol == this.gasIdentifiers!.get(chain) ? await this.aboatContracts.get(chain)!: tokenB.address;
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
      if (convertedName.includes("kdxlp") || convertedName.includes("wlp") || convertedName.includes("cake-lp")) {
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
