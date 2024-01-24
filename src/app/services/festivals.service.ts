import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from '../interfaces/festival';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Festival[]> {
    return this.http.get<Festival[]>('festivals');
  }
}
