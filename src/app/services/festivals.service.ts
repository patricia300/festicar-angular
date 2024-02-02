import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { Festival } from '../interfaces/festival';
import { Pageable } from '../interfaces/pageable';
import { formatDate } from '../utils/date.util';
import { PageEvent } from '../interfaces/page-event';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  selectedFestival?: Festival;
  festivals: Festival[] = [];
  festivalsIsLoading: boolean = false;
  currentPageable?: Pageable<Festival>;
  pagination: PageEvent = {
    page: 0,
    pageCount: 0,
    rows: 10,
    first: 0,
    totalOfElements: 0
  };

  constructor(private http: HttpClient) { }

  getAll(numeroPage = 0, taillePage = 10, tri = 'asc'): Observable<Pageable<Festival>> {
    this.festivalsIsLoading = true;

    return this.http
      .get<Pageable<Festival>>('festivals', { params: { numeroPage, taillePage, tri } })
      .pipe(
        tap((pageableFestival) => {
          // this.festivals = [...this.festivals, ...pageableFestival.content];
          this.festivals = pageableFestival.content;
          this.currentPageable = pageableFestival;
          this.pagination.pageCount = pageableFestival.totalPages;
          this.pagination.totalOfElements = pageableFestival.totalElements;
        }),
        finalize(() => this.festivalsIsLoading = false)
      )
  }

  getAllByName(nomFestival: string): Observable<Festival[]> {
    this.festivalsIsLoading = true;
    return this.http.get<Festival[]>('festivals/by-nom', { params: { nom: nomFestival }}).pipe(
      tap((festivals) => {
        this.festivals = festivals;
      }),
      finalize(() => this.festivalsIsLoading = false)
    );
  }

  getFestivalById(idFestival: number): Observable<Festival> {
    return this.http.get<Festival>(`festivals/${idFestival}`);
  }

  getAllFestivalsByCommune(codeInsee: string): Observable<Festival[]> {
    this.festivals = [];
    this.festivalsIsLoading = true;
    return this.http.get<Festival[]>('festivals/by-commune', { params: { communeCodeInsee: codeInsee } }).pipe(
      tap((festivals) => {
        this.festivals = festivals;
      }),
      finalize(() => this.festivalsIsLoading = false)
    );
  }

  getAllFestivalsByDate(dateDebut: string): Observable<Festival[]> {
    this.festivals = [];
    this.festivalsIsLoading = true;
    return this.http.get<Festival[]>('festivals/by-date', { params: { dateDebut: formatDate(dateDebut) } }).pipe(
      tap((festivals) => {
        this.festivals = festivals;
      }),
      finalize(() => this.festivalsIsLoading = false)
    );
  }

  getAllFestivalsByDomaine(nomDomaine: string): Observable<Festival[]> {
    this.festivals = [];
    this.festivalsIsLoading = true;
    return this.http.get<Festival[]>('festivals/by-domaine', { params: { domaine: nomDomaine } }).pipe(
      tap((festivals) => {
        this.festivals = festivals;
      }),
      finalize(() => this.festivalsIsLoading = false)
    );
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
