import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/services/web3/web3.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly web3Service: Web3Service) {

  }

  async ngOnInit() {
    await this.web3Service.reConnect();
  }

  title = 'talkaboat';


}
