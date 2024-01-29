import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommuneSearchItem } from 'src/app/interfaces/commune';
import { CommuneService } from 'src/app/services/commune.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
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
