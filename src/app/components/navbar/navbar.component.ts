import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommuneSearchItem } from 'src/app/interfaces/commune';
import { CommuneService } from 'src/app/services/commune.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() showCommuneSearchInput: boolean = false;
  @Input() showFestivalSearchInput: boolean = false;

  profilItems?: MenuItem[];
  panierItems?: MenuItem[];

  selectedCommune?: CommuneSearchItem;
  communeSuggestions: CommuneSearchItem[] = [];

  constructor(
    private communeService: CommuneService,
    protected panierService: PanierService,
    private router: Router) {}

  ngOnInit() {
    this.initProfilItems();
    this.communeService.initData();

    this.panierService.getCurrentPanier('lucie.deschamps@gmail.com').subscribe();
  }

  filterCommune(event: AutoCompleteCompleteEvent) {
    this.communeSuggestions = this.communeService.communes.filter(c => c.nom.toLowerCase().includes(event.query.toLowerCase()));
  }

  initProfilItems() {
    this.profilItems = [
      {
        label: 'Se connecter',
        icon: 'pi pi-sign-in',
        routerLink: '/authentication'
      }
    ];
  }
}
