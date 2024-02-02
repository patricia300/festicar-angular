import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { DomainePrincipal } from '../interfaces/domaine-principal';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  domainePrincipals: DomainePrincipal[] = [];
  domainePrincipalsString: string[] = [];
  domaineIsLoading: boolean = false;

  constructor(private http: HttpClient) { }

  getAllDomainePrincipals(): Observable<DomainePrincipal[]>{
    this.domainePrincipals = [];
    this.domainePrincipalsString = [];
    this.domaineIsLoading = true;
    return this.http.get<DomainePrincipal[]>('domaine-principals').pipe(
      tap((domaines) => {
        this.domainePrincipals = domaines;
        this.domainePrincipalsString = domaines.map(d => d.nom);
      }),
      finalize(() => this.domaineIsLoading = false)
    );
  }
}
