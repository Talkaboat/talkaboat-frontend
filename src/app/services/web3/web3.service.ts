import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { BLOCKCHAIN } from 'src/constants/blockchain.constants';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: any;
  public provider: any;
  public accounts: any;
  public chainId: number = 56;
  web3Modal: Web3Modal = new Web3Modal();
  public chainIdObservable = new EventEmitter<number>();
  public accountsObservable = new EventEmitter<string[]>();
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
            56: "https://bsc-dataseed.binance.org/",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
          },
          chainId: 56
        }
      }
    };

    this.web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      network: "binance",
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
      return window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x38' /*'0x61'*/}]});
  }

  async isBraveBrowser() {
    let navigator: any = window.navigator;

    return (navigator.brave && await navigator.brave.isBrave() || false);
  }

  async reConnect() {
    if (this.web3Modal.cachedProvider) {
      await this.connect();
    } else {
      await this.defaultLogin();
    }
  }

  async connect(clearCached = false) {
    if (clearCached) {
      this.web3Modal.clearCachedProvider();
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
    this.web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
    this.chainId = await this.web3.eth.net.getId();
    this.accounts = undefined;
    this.accountsObservable.emit([]);
    this.chainIdObservable.emit(this.chainId);
  }

  async disconnect() {
    this.web3Modal.clearCachedProvider();
    this.web3 = undefined;
    this.provider = undefined;
    await this.defaultLogin();
  }

  async configChainOnMetaMask() {
    if (this.provider.isMetaMask) {
      await this.addNetwork();
      await this.switchNetwork();
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
    if (!BLOCKCHAIN.ALLOWED_NETWORKS.includes(chainId)) {
      // this.toast.error("This chain is not supported. Please use Binance Smart Chain.", "Network not allowed");
      await this.disconnect();
    } else {
      this.chainId = chainId
      this.chainIdObservable.emit(this.chainId);
    }
    return true;
  }

  async refreshAccounts(): Promise<string> {
    if (!this.web3) {
      this.accounts = [];
      this.accountsObservable.emit(this.accounts);
      return '';
    }
    this.accounts = await this.web3.eth.getAccounts();
    console.log(this.accounts);
    this.accountsObservable.emit(this.accounts);
    return this.accounts[0];
  }
}
