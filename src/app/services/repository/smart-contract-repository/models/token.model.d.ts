import Big from 'big.js';
export class TokenModel {
    symbol: any;
    name: string;
    decimals: number;
    address?: string;
    logoURI?: string;
    balance?: Big;
    allowance?: Big;
    displayBalance?: Big;
    swapAmount?: Big;
    weiBalance?: Big;
    priceInBusd?: number;
}
