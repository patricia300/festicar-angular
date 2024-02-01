import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FestivalsService } from './services/festivals.service';
import { PanierService } from './services/panier.service';
import { DomaineService } from './services/domaine.service';
import { DomainePrincipal } from './interfaces/domaine-principal';
import { RouteService } from './services/route-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges  {
  showFestivalSearchInput: boolean = false;
  showCommuneSearchInput: boolean = false;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    this.updateShowCommuneSearchInput();
    this.updateShowFestivalSearchInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateShowCommuneSearchInput();
    this.updateShowFestivalSearchInput();
  }

  updateShowFestivalSearchInput() {
    this.showFestivalSearchInput = this.routeService.currentRoute.includes('/festivals');
  }

  updateShowCommuneSearchInput() {
    this.showCommuneSearchInput = this.routeService.currentRoute.includes('/covoiturages');
  }

}
