import { EventEmitter, Injectable } from '@angular/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Big from "big.js";
import { BLOCKCHAIN } from 'src/constants/blockchain.constants';
import Web3 from "web3";
import Web3Modal from "web3modal";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: any;
  public provider: any;
  public accounts: any;
  public chainId: number = 24;
  web3Modal: Web3Modal = new Web3Modal();
  public chainIdObservable = new EventEmitter<number>();
  public accountsObservable = new EventEmitter<string[]>();
  private readonly baseRPC = 'https://rpc.kardiachain.io';
  constructor() {
    this.createModal();
  }

  createModal() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, //required
        options: {

          bridge: 'https://bridge.walletconnect.org',
          rpc: {
            1: "https://bsc-dataseed.binance.org/",
            24: "https://rpc.kardiachain.io",
            56: "https://bsc-dataseed.binance.org/",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            242: "https://dev.kardiachain.io"
          },
          chainId: 24
        }
      },
    };

    this.web3Modal = new Web3Modal({
      providerOptions, // required
      network: "binance",
      cacheProvider: true,
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)',
      },
    });
  }

  async addNetwork() {
    if (window.ethereum) {
      return window.ethereum.request({

        method: "wallet_addEthereumChain",

        params: BLOCKCHAIN.NETWORK_DATA,

      });
    }
  }

  async switchNetwork() {
      return window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x18' /*'0x38'*/}]});
  }

  async isBraveBrowser() {
    let navigator: any = window.navigator;

    return (navigator.brave && await navigator.brave.isBrave() || false);
  }

  async reConnect() {
    if (this.web3Modal.cachedProvider) {
      await this.connect(false, true);
    } else {
      await this.defaultLogin();
    }
  }

  async connect(clearCached = false, autoConnect = false) {
    if (clearCached) {
      await this.web3Modal.clearCachedProvider();
    }
    this.provider = await this.web3Modal.connect();
    if (this.provider) {
      this.configListeners();
      this.web3 = new Web3(this.provider);
      await this.configChainOnMetaMask();
    } else {
      await this.disconnect();
    }
    await this.refreshAccounts();
  }

  async defaultLogin() {
    this.web3 = new Web3(this.baseRPC);//"https://bsc-dataseed.binance.org/");
    this.chainId = await this.web3.eth.net.getId();
    this.accounts = undefined;
    this.accountsObservable.emit([]);
    this.chainIdObservable.emit(this.chainId);
  }

  async disconnect() {
    this.web3Modal.clearCachedProvider();
    this.web3 = undefined;
    try {
      this.provider.disconnect();
    } catch (error) {
      //Can't disconnect
    }
    this.provider = undefined;
    await this.defaultLogin();
  }

  async configChainOnMetaMask() {
    if (this.provider.isMetaMask) {
      await this.addNetwork();
      await this.switchNetwork();
    }
  }

  public async getEstimatedGas(method: any, from: string, bnbAmount = "0"): Promise<string> {
    try {

        const gas = Big(await method.estimateGas({ from, value: bnbAmount }));
        return gas.mul(1.1).toFixed(0);
    } catch(error) {
        return (await Promise.resolve(BLOCKCHAIN.GAS_PRICE)).toFixed(0);
    }
}

  configListeners() {
    this.provider.on("accountsChanged", (accounts: string[]) => {
      if (this.provider) {
        this.accounts = accounts;
        this.accountsObservable.emit(this.accounts);
      }
    });
    this.provider.on("chainChanged", async (chainId: number) => {
      if (this.provider) {
        this.checkChain(parseInt(chainId.toString(), 16));
      }
    });
  }

  async checkChain(chainId: number): Promise<boolean> {
    // if (!BLOCKCHAIN.ALLOWED_NETWORKS.includes(chainId)) {
    //   // this.toast.error("This chain is not supported. Please use Binance Smart Chain.", "Network not allowed");
    //   await this.disconnect();
    // } else {
      this.chainId = chainId
      this.chainIdObservable.emit(this.chainId);
    // }
    return true;
  }

  async refreshAccounts(): Promise<string> {
    if (!this.web3) {
      this.accounts = [];
      this.accountsObservable.emit(this.accounts);
      return '';
    }
    this.accounts = await this.web3.eth.getAccounts();
    this.accountsObservable.emit(this.accounts);
    return this.accounts[0];
  }
}
