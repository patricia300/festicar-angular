import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from '@firebase/auth';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateurService/utilisateur.service';
import { Utilisateur } from 'src/app/interfaces/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any = this.getToken();

  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private utilisateurService: UtilisateurService
    ) {
      if(this.token){
        this.utilisateurService.getUtilisateurByToken(this.token).subscribe(
          (utilisateur: Utilisateur) =>{
            this.utilisateurService.utilisateur=utilisateur;
            console.log(this.utilisateurService.utilisateur);

          }
        );
      }
    }

  async googleSignin(){
    const googleProvider = new GoogleAuthProvider();

    googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
    googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    const credential = await this.afauth.signInWithPopup(new GoogleAuthProvider());
    this.setUtilisateur(credential);
  }

  async facebookSignin(){
    const facebookProvider =new FacebookAuthProvider();
    facebookProvider.addScope("email");
    facebookProvider.addScope("public_profile");

    const credential = await this.afauth.signInWithPopup(new FacebookAuthProvider());
    this.setUtilisateur(credential);
  }

  async signOut() {
    await this.afauth.signOut();
    this.router.navigate(['/']);
  }

  isAuthenticated(){
    if(this.token)
      return true;
    return false;
  }

  private setUtilisateur(credential: any){
    this.utilisateurService.getUtilisateur(credential.user.email)
      .subscribe(
        (utilisateur: Utilisateur)=>{
          if(utilisateur){
            this.utilisateurService.utilisateur=utilisateur;
            this.setToken(credential);
            console.log(this.utilisateurService.utilisateur);
          }else{
            const utilisateur: Utilisateur ={
              email:credential.user.email,
              prenom: credential.user.displayName.split(" ").at(0),
              nom: credential.user.displayName.split(" ").at(1),
              urlPhoto:  credential.user.photoURL,
              token: credential.credential.accessToken
            };
            this.utilisateurService.createUtilisateur(utilisateur).subscribe(
              (utilisateur: Utilisateur) => {
                this.utilisateurService.utilisateur=utilisateur;
                this.setToken(credential);
                console.log(this.utilisateurService.utilisateur);
              });
          }});
  }

  private setToken(credential: any){
    this.token = credential.credential.accessToken;
    localStorage.setItem("token", this.token);
  }

  private getToken() {
    return localStorage.getItem("token") ? localStorage.getItem("token") : "";
  }
}
