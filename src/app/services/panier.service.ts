import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { GetAllPanierResponse, Panier, PaymentResponse } from '../interfaces/panier';
import { PanierRequestBodyDto } from '../interfaces/panier-request-body-dto';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  currentPanier?: Panier;
  currentPanierIsLoading: boolean = false;
  paymentHistoryIsLoading: boolean = false;
  nbArticles: number = 0;

  constructor(private http: HttpClient) { }

  getAll(email: string): Observable<GetAllPanierResponse[]> {
    this.paymentHistoryIsLoading = true;
    return this.http.get<GetAllPanierResponse[]>('paniers', { params: { email } }).pipe(
      finalize(() => this.paymentHistoryIsLoading = false)
    );
  }

  getCurrentPanier(email: string): Observable<Panier> {
    this.currentPanierIsLoading = true;
    return this.http.get<Panier>('panier', { params: { email } }).pipe(
      tap((panier) => {
        this.currentPanier = panier;
        this.nbArticles = this.currentPanier.articles.length;

        console.log("get current panier: ", this.currentPanier);
      }),
      finalize(() => this.currentPanierIsLoading = false)
    );
  }

  postPanier(panierRequestBodyDto: PanierRequestBodyDto): Observable<Panier> {
    return this.http.post<Panier>('panier', panierRequestBodyDto);
  }

  payerPanier(idPanier: number): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>('panier/payer', { params: { id: idPanier }});
  }

  paiementPartiel(payload: {emailFestivalier: string, articles: number[]}): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>('panier/payer/partiel', payload);
  }

  supprimerArticle(idArticle: number) {
    return this.http.delete<any>(`article/${idArticle}`);
  }
}
