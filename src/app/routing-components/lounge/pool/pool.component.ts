import { Component, Input, OnInit } from '@angular/core';
import { PoolInfo } from 'src/app/services/repository/smart-contract-repository/models/pool-info.model';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  @Input() poolInfo?: PoolInfo;
  isOpen = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.poolInfo);
  }

  getTokenIcon(symbol: string) {
    return "./assets/images/coins/0.png".replace("0", symbol.toLowerCase());
  }
}
