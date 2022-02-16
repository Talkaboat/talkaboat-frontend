import { Injectable } from '@angular/core';
import { bep20 } from 'src/constants/contracts/bep20';
import { pair } from 'src/constants/contracts/pair';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getTokenAbi() {
    return bep20;
  }

  getLpAbi() {
    return pair;
  }

}
