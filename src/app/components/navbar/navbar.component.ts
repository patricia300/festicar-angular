import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommuneSearchItem } from 'src/app/interfaces/commune';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CommuneService } from 'src/app/services/commune.service';
import { PanierService } from 'src/app/services/panier.service';
import { UtilisateurService } from 'src/app/services/utilisateurService/utilisateur.service';

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
    protected authService: AuthService,
    private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.initProfilItems();
    this.communeService.initData();

    if(this.utilisateurService.utilisateur && this.authService.isAuthenticated()) {
      this.panierService.getCurrentPanier(this.utilisateurService.utilisateur.email).subscribe();
    }
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
