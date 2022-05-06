export interface Investment {
  username?: string;
  type: string;
  usd: number;
  token: number;
  date: Date;
  pricePerToken: number;
}
