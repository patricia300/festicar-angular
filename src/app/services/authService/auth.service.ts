import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from '@firebase/auth';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateurService/utilisateur.service';
import { Utilisateur } from 'src/app/interfaces/utilisateur';
import { ToastService } from '../toast.service';
import { PanierService } from '../panier.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = this.getToken();
  userEmail: string | null = this.getUserEmail();

  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private toastService: ToastService,
    private panierService: PanierService
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

  signOut() {
    this.afauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        this.token = '';
        this.userEmail = '';
        this.utilisateurService.utilisateur = undefined;
        this.toastService.showSuccess('Compte déconnecté avec succès');
        this.router.navigate(['/']);
      },
      () => this.toastService.showError('Echec de la déconnexion')
    );
  }

  isAuthenticated(){
    if(this.token)
      return true;
    return false;
  }

  private setUtilisateur(credential: any){
    this.utilisateurService.getUtilisateur(credential.user.email)
      .subscribe({
        next: (utilisateur: Utilisateur) => {
          if(utilisateur){
            this.utilisateurService.utilisateur=utilisateur;
            this.setToken(credential);
            localStorage.setItem('userEmail', utilisateur.email);
            this.toastService.showSuccess('Connexion réussie');
            this.panierService.getCurrentPanier(utilisateur.email).subscribe();
          }else{
            const utilisateur: Utilisateur ={
              email:credential.user.email,
              prenom: credential.user.displayName.split(" ").at(0),
              nom: credential.user.displayName.split(" ").at(1),
              urlPhoto:  credential.user.photoURL,
              token: credential.credential.accessToken
            };

            this.utilisateurService.createUtilisateur(utilisateur).subscribe({
              next: (utilisateur: Utilisateur) => {
                this.utilisateurService.utilisateur=utilisateur;
                this.setToken(credential);
                localStorage.setItem('userEmail', utilisateur.email);
                this.toastService.showSuccess('Compte créé et connecté')
              },
              error: () => this.toastService.showError('Compte utilisateur non créé')
            });
          }

          this.router.navigateByUrl('/festivals');
        },
        error: () =>  this.toastService.showError("Echec de vérification de l'utilisateur")
      });
  }

  private setToken(credential: any){
    localStorage.setItem('token', credential.credential.accessToken);
    this.token = this.getToken();
  }

  private getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  private getUserEmail() {
    return localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '';
  }
}
