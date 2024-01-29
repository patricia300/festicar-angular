import { Injectable } from '@angular/core';
import { Commune, CommuneSearchItem } from '../interfaces/commune';
import communeData from '../data/communes.json';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
  communes: CommuneSearchItem[] = [];
  communesIsLoading: boolean = false;

  constructor() { }

  initData() {
    this.communes = <CommuneSearchItem[]>communeData;
  }
}
