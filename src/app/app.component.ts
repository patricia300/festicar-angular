import { Component, OnInit } from '@angular/core';
import { FestivalsService } from './services/festivals.service';
import { Festival } from './interfaces/festival';
import { Pageable } from './interfaces/pageable';
import { PanierService } from './services/panier.service';
import { Panier } from './interfaces/panier';
import { DomaineService } from './services/domaine.service';
import { DomainePrincipal } from './interfaces/domaine-principal';
import { RouteService } from './services/route-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // festivals: Festival[] = [];
  // festivalsByCommune: Festival[] = [];
  // festivalsByDate: Festival[] = [];
  // festivalsByFilter: Festival[] = [];

  paniers: Panier[] = [];
  currentPanier?: Panier;

  domainePrincipals?: DomainePrincipal[];

  constructor(
    private routeService: RouteService,
    private festivalsService: FestivalsService,
    private panierService: PanierService,
    private domainService: DomaineService) { }

  ngOnInit(): void {
    this.festivalsService.getAll().subscribe();

    // this.festivalsService.getAllFestivalsByCommune().subscribe((pageFestival: Pageable<Festival>) => {
    //   this.festivalsByCommune = pageFestival.content;
    //   console.log("festivalsByCommune : ", this.festivalsByCommune);
    // });

    // this.festivalsService.getAllFestivalsByDate().subscribe((pageFestival: Pageable<Festival>) => {
    //   this.festivalsByDate = pageFestival.content;
    //   console.log("festivalsByDate : ", this.festivalsByDate);
    // });

    // this.festivalsService.getAllFestivalByFiltre().subscribe((pageFestival: Pageable<Festival>) => {
    //   this.festivalsByFilter = pageFestival.content;
    //   console.log("festivalsByFilter : ", this.festivalsByFilter);
    // });



    // this.panierService.getAll().subscribe((pagePanier: Panier[]) => {
    //   this.paniers = pagePanier;
    //   console.log("paniers : ", this.paniers);
    // });

    // this.panierService.getCurrentPanier().subscribe((pagePanier: Panier) => {
    //   this.currentPanier = pagePanier;
    //   console.log("currentPanier : ", this.paniers);
    // });



    // this.domainService.getAll().subscribe((pageDomaine: DomainePrincipal[]) => {
    //   this.domainePrincipals = pageDomaine;
    //   console.log("domainePrincipals : ", this.domainePrincipals);
    // });
  }

  showFestivalSearchInput() {
    return this.routeService.currentRoute.includes('/festivals');
  }

  showCommuneSearchInput() {
    return this.routeService.currentRoute.includes('/covoiturages');
  }

}
