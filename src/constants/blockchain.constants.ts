import Big from 'big.js';
export const BLOCKCHAIN = {
  BLOCKS_PER_DAY: 28800,
  BLOCKS_PER_HOUR: 28800 / 24,
  BLOCKS_PER_MINUTE: 28800 / 24 / 60,
  BLOCKS_PER_YEAR: 28800 * 360,
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
  MaxUint256: Big(2 ** 255),
  GAS_PRICE: Big(1000000),
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
],
  Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
  ],
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
