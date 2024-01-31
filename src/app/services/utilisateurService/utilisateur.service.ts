import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utilisateur } from 'src/app/interfaces/utilisateur';
import { User } from '@firebase/auth';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  utilisateur: Utilisateur = {};

  constructor( private http: HttpClient) { }


  getUtilisateur(email: string): Observable<Utilisateur>{
    return this.http.get<Utilisateur>('festivalier',{ params: { email } });
  }

  getUtilisateurByToken(token: string): Observable<Utilisateur>{
    return this.http.get<Utilisateur>('festivalier/by-token',{ params: { token } });
  }

  createUtilisateur(utilisateur: Utilisateur){
    return this.http.post<Utilisateur>('festivalier', utilisateur);
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {

      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  

}
