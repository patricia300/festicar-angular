import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Panier } from '../interfaces/panier';
import { PanierRequestBodyDto } from '../interfaces/panier-request-body-dto';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  currentPanier?: Panier;
  nbArticles: number = 0;

  constructor(private http: HttpClient) { }

  getAll(email: string): Observable<Panier[]> {
    return this.http.get<Panier[]>('paniers', { params: { email } });
  }

  getCurrentPanier(email: string): Observable<Panier> {
    return this.http.get<Panier>('panier', { params: { email } }).pipe(
      tap((panier) => {
        this.currentPanier = panier;
        this.nbArticles = this.currentPanier.articles.length;

        console.log("get current panier: ", this.currentPanier);
      })
    );
  }

  postPanier(panierRequestBodyDto: PanierRequestBodyDto): Observable<Panier> {
    return this.http.post<Panier>('panier', panierRequestBodyDto);
  }

  payerPanier(id: number): Observable<Panier> {
    return this.http.put<Panier>('panier/payer', { params: { id }});
  }

  supprimerArticle(idArticle: number) {
    return this.http.delete<any>(`article/${idArticle}`);
  }
}
