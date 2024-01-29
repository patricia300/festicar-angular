import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OffreCovoiturage } from '../interfaces/offre-covoiturage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreCovoiturageService {
  constructor(private http: HttpClient) { }

  getOffreCovoiturageByFestival(idFestival: number): Observable<OffreCovoiturage[]> {
    return this.http.get<OffreCovoiturage[]>('http://localhost:8080/offre-covoiturages/by-id-festival', { params: { idFestival }});
  }
}
