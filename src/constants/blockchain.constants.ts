export const BLOCKCHAIN = {
  NETWORK_DATA: [
    {
      chainId: "0x38",//"0x61",
      chainName: "Binance Smart Chain",
      rpcUrls: ["https://bsc-dataseed1.binance.org"],//"https://data-seed-prebsc-1-s1.binance.org:8545/"],
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,

      },
      blockExplorerUrls: ["https://bscscan.com/"],  //Remove testnet
    },
  ],
  ALLOWED_NETWORKS: [56, 97],
  RPC_URLS: {
    BSC: 'https://bsc-dataseed.binance.org/',
    BSC_TEST: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  }
}
