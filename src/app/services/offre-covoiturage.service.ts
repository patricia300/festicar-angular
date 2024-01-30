import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OffreCovoiturage, OffreCovoiturageCardData } from '../interfaces/offre-covoiturage';
import { Observable, map, tap } from 'rxjs';
import { FestivalsService } from './festivals.service';
import { Festival } from '../interfaces/festival';

@Injectable({
  providedIn: 'root'
})
export class OffreCovoiturageService {
  currentFestival?: Festival;
  offreCovoiturages: OffreCovoiturageCardData[] = [];
  qtePass: number = 0;
  offreCovoituragesIsLoading: boolean = false;

  constructor(private http: HttpClient, private festivalsService: FestivalsService) { }

  getOffreCovoiturageByFestival(idFestival: number): Observable<OffreCovoiturage[]> {
    return this.http.get<OffreCovoiturage[]>('offre-covoiturages/by-id-festival', { params: { idFestival }});
  }

  initCurrentFestival(idFestival: number) {
    this.offreCovoituragesIsLoading = true;
    return this.festivalsService.getFestivalById(idFestival).pipe(
      tap(festival => {
        this.currentFestival = festival;
        this.offreCovoiturages = festival.offreCovoiturages.map((offre: OffreCovoiturage) => ({
          ...offre,
          pointPassagePlusProche: offre.pointPassageCovoiturages.length ? offre.pointPassageCovoiturages[0] : undefined
        }));

        this.offreCovoituragesIsLoading = false;
      })
    )
  }

  initQtePass(qte: number) {
    this.qtePass = qte;
  }
}
