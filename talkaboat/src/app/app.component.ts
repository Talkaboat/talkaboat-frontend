import { Component, OnInit } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  async ngOnInit() {
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
          chainId: 56,
          darkMode: true
        }
      }
    };
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    const provider = await web3Modal.connect();
  }
  title = 'talkaboat';


}
