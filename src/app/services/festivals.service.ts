import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from '../interfaces/festival';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {

  constructor(private http: HttpClient) { }

  getAll(numeroPage = 0, taillePage = 10, tri = 'asc'): Observable<Pageable<Festival>> {
    return this.http.get<Pageable<Festival>>('festivals', { params: { numeroPage, taillePage, tri } });
  }
}
