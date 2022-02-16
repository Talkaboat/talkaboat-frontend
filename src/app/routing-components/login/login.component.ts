import { Component, OnInit } from '@angular/core';
import { AuthorizationResponse } from 'src/app/services/repository/user-repository/models/authorization-response.model';
import { UserAuthorizationRequestResponse } from 'src/app/services/repository/user-repository/models/user-authorization-request.response.model';
import { UserRepositoryService } from 'src/app/services/repository/user-repository/user-repository.service';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly userRepositoryService: UserRepositoryService ,private readonly web3Service: Web3Service) { }

  ngOnInit(): void {
    //Check if user is signed in -> go back to homepage
  }

  async connect() {
    await this.web3Service.connect(true);
    console.log(this.web3Service.accounts);
    if (this.web3Service.accounts) {
      this.userRepositoryService.requestLogin(this.web3Service.accounts[0]).subscribe({
        next: (v) => this.signAuthorizationRequest(v),
        error: (e) => this.requestLoginError(e)
      });
    }
  }

  signAuthorizationRequest(authorizationRequest: UserAuthorizationRequestResponse) {
    this.web3Service.web3.eth.personal.sign(authorizationRequest.key, this.web3Service.accounts[0])
      .then((v: string) => this.login(v))
      .catch((e: any) => this.signAuthorizationError(e));
  }

  login(signature: string) {
    this.userRepositoryService.login(this.web3Service.accounts[0], signature).subscribe({
      next: (v) => this.successfullyLogin(v),
      error: (e) => this.loginError(e)
    });
  }

  successfullyLogin(authorization: AuthorizationResponse) {
    localStorage.setItem('aboat_access', authorization.token);
  }

  requestLoginError(error: any) {
    //Show request login error
  }

  signAuthorizationError(error: any) {

  }

  loginError(error: any) {

  }
}
