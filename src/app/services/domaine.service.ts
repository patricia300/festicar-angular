import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainePrincipal } from '../interfaces/domaine-principal';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<DomainePrincipal[]>{
    return this.http.get<DomainePrincipal[]>('domaine-principals');
  }
}
