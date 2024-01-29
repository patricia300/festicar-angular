import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from '@firebase/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private router: Router
    ) { }

  googleSignin(){
    this.afauth.signInWithPopup(new GoogleAuthProvider())
      .then(res => {
        console.log(res);
        this.router.navigateByUrl("/home");
      }, err =>{console.log(err)});
  }

  facebookSignin(){
    this.afauth.signInWithPopup(new FacebookAuthProvider())
    .then(res => {console.log(res)}, err =>{console.log(err)});
  }

  async signOut() {
    await this.afauth.signOut();
    this.router.navigate(['/']);
  }
}
