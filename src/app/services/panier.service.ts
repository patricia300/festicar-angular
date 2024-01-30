import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Panier } from '../interfaces/panier';
import { PanierRequestBodyDto } from '../interfaces/panier-request-body-dto';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(private http: HttpClient) { }

  getAll(email: string): Observable<Panier[]> {
    return this.http.get<Panier[]>('paniers', { params: { email } });
  }

  getCurrentPanier(email: string): Observable<Panier> {
    return this.http.get<Panier>('panier', { params: { email } });
  }

  postPanier(panierRequestBodyDto: PanierRequestBodyDto): Observable<Panier> {
    return this.http.post<Panier>('panier', panierRequestBodyDto);
  }

  putPanier(id: number): Observable<Panier> {
    return this.http.put<Panier>('panier/payer', { params: { id }});
  }
}
