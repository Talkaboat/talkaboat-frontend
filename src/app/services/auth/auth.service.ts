import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { ModalState } from 'src/app/static-components/modal/models/modal-state.model';
import { ResponseModel } from '../repository/user-repository/models/response.model';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { UserService } from '../user/user.service';
import { WebsiteStateService } from '../website-state/website-state.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  token: string = "";
  constructor(private readonly auth: AngularFireAuth, private readonly userRepository: UserRepositoryService, private readonly websiteState: WebsiteStateService, private readonly userService: UserService) {
    this.auth.onAuthStateChanged(async user => {
      this.user = user;
      if (user) {
        this.token = await user.getIdToken(true);
        userRepository.loginFirebase(this.token).subscribe(response => this.handleResponse(response));
      }
    });
  }

  handleResponse(response: ResponseModel) {
    console.log(response.text);
    switch (response.text) {
      case 'new_account': this.openNewUserModal(); break;
      case 'user_already_exist': this.openNewUserModal(); break;
      case 'user_not_registered': this.openNewUserModal(); console.log("Error while creating user in database"); break;
      case 'username_invalid': this.openNewUserModal(); break;
      case 'user_registered': this.getLoginToken(response.data); break;
      case 'connected': this.getLoginToken(response.data); break;
      case 'not_connected': console.log("Verify Email Pin"); break;
    }
  }

  openNewUserModal() {
    this.websiteState.modalState = this.getLoginModalState(); this.websiteState.onLoginModalStateChanged.emit(true);
  }

  getLoginToken(token: string | undefined) {
    if (!token) {
      return;
    }
    localStorage.setItem('aboat_access', token);
    this.userService.getUserData();
  }

  getLoginModalState(): ModalState {
    return {
      title: "Create new user",
      placeholder: "Username",
      useTextField: true,
      onSubmit: (username: any) => { this.createNewUser(username); },
      onClose: () => { }
    };
  }

  createNewUser(username: string) {
    this.userRepository.registerFirebase(this.token, username).subscribe((response) => {
      this.handleResponse(response);
    });
  }

  googleSignIn() {
    if (!getAuth().currentUser) {
      return;
    }
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.auth.signInWithRedirect(provider);
  }

  facebookSignIn() {
    if (!getAuth().currentUser) {
      return;
    }
    const provider = new FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.auth.signInWithRedirect(provider);
  }




  logout() {
    this.auth.signOut();
  }
}
