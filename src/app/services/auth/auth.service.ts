import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  constructor(private readonly auth: AngularFireAuth) {
    this.auth.onAuthStateChanged(user => {
      console.log(user);
      this.user = user;
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
