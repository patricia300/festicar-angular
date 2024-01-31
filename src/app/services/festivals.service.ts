import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { Festival } from '../interfaces/festival';
import { Pageable } from '../interfaces/pageable';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  selectedFestival?: Festival;
  festivals: Festival[] = [];
  festivalsIsLoading: boolean = false;
  currentPageable?: Pageable<Festival>;

  constructor(private http: HttpClient) { }

  getAll(numeroPage = 0, taillePage = 10, tri = 'asc'): Observable<Pageable<Festival>> {
    this.festivalsIsLoading = true;

    return this.http
      .get<Pageable<Festival>>('festivals', { params: { numeroPage, taillePage, tri } })
      .pipe(
        tap((pageableFestival) => {
          this.festivals = [...this.festivals, ...pageableFestival.content];
          this.currentPageable = pageableFestival;
        }),
        finalize(() => this.festivalsIsLoading = false)
      )
  }

  getFestivalById(idFestival: number): Observable<Festival> {
    return this.http.get<Festival>(`festivals/${idFestival}`);
  }

  getAllFestivalsByCommune(numeroPage = 0, taillePage = 10, commune = 'Mulhouse'): Observable<Pageable<Festival>> {
    return this.http.get<Pageable<Festival>>('festivals/by-commune', { params: { numeroPage, taillePage, commune } });
  }

  getAllFestivalsByDate(dateDebut = '02/02/2024', dateFin = '27/04/2024'): Observable<Pageable<Festival>> {
    return this.http.get<Pageable<Festival>>('festivals/by-date', { params: { dateDebut, dateFin } });
  }

  getAllFestivalByFiltre(
    numeroPage = 0,
    taillePage = 10,
    triPar = 'dateDebut',
    dateDebut = '01/06/2024',
    communeCodeInsee = "68224",
    domainePrincipal = 'music',
    sousDomaine = 'Trans'
    ): Observable<Pageable<Festival>> {
    return this.http.get<Pageable<Festival>>('festivals/filtre', { params: { numeroPage, taillePage, triPar, dateDebut, communeCodeInsee, domainePrincipal, sousDomaine } });
  }

}
