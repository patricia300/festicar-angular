import { Component, Input } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommuneSearchItem } from 'src/app/interfaces/commune';
import { CommuneService } from 'src/app/services/commune.service';

@Component({
  selector: 'app-commune-input',
  templateUrl: './commune-input.component.html',
  styleUrls: ['./commune-input.component.scss']
})
export class CommuneInputComponent {
  @Input() placeholder: string = 'Adresse de votre commune';

  selectedCommune?: CommuneSearchItem;
  communeSuggestions: CommuneSearchItem[] = [];

  constructor(private communeService: CommuneService) {}

  ngOnInit() {
    this.communeService.initData();
  }

  filterCommune(event: AutoCompleteCompleteEvent) {
    this.communeSuggestions = this.communeService.communes.filter(c => c.nom.toLowerCase().includes(event.query.toLowerCase()));
  }
}
