import Big from 'big.js';
import { TokenModel } from "./token.model";

export interface PoolInfo {
  rawPending: Big;
  userInfo: any;
  allowance: Big;
  rawAmount: Big;
  accCoinPerShare: any;
  amount: Big;
  lastDeposit: string;
  withdrawalDate?: string;
  lockPeriod: number;
  withdrawalTimestamp?: number;
  rawRewardDebt: any;
  rewardDebt: number;
  pending: Big;
  allocPoint: number;
  apr: Big;
  yearlyTokenReward: Big;
  liquidity: Big;
  depositedCoins: Big;
  tokenA?: TokenModel;
  tokenB?: TokenModel;
  depositFee: any;
  decimals: number;
  lpToken: string;
  id: number;
  totalLiquidity: Big;
  price?: number;
  symbols: string[];
  addresses: string[];
}
