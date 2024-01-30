import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommuneSearchItem } from 'src/app/interfaces/commune';
import { CommuneService } from 'src/app/services/commune.service';
import { RouteService } from 'src/app/services/route-service.service';

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

  constructor(private communeService: CommuneService) {}

  ngOnInit() {
    this.initProfilItems();
    this.initPanierItems();
    this.communeService.initData();
  }

  filterCommune(event: AutoCompleteCompleteEvent) {
    this.communeSuggestions = this.communeService.communes.filter(c => c.nom.toLowerCase().includes(event.query.toLowerCase()));
  }

  initProfilItems() {
    this.profilItems = [
      {
        label: 'Se connecter',
        icon: 'pi pi-sign-in'
      }
    ];
  }

  initPanierItems() {
    this.panierItems = [
      {
        label: '3 articles',
        icon: 'pi pi-ticket'
      },
      {
        label: 'Total: 63.00 €',
        icon: 'pi pi-money-bill'
      }
    ]
  }
}
