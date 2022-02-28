import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ContractService } from 'src/app/services/web3/contract/contract.service';
import { LoungeService } from 'src/app/services/web3/lounge/lounge.service';
import { TokenService } from 'src/app/services/web3/token/token.service';
import { LoungeRoutingModule } from './lounge-routing.module';
import { LoungeComponent } from './lounge.component';
import { PoolComponent } from './pool/pool.component';



@NgModule({
  declarations: [
    LoungeComponent,
    PoolComponent
  ],
  imports: [
    CommonModule,
    LoungeRoutingModule,
    PipeModule
  ],
  providers: [
    LoungeService,
    ContractService,
    TokenService
  ],
  exports: [
    LoungeComponent
  ]
})
export class LoungeModule { }
