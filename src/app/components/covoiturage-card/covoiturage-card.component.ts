import { Component, Input } from '@angular/core';
import { OffreCovoiturageCardData } from 'src/app/interfaces/offre-covoiturage';

@Component({
  selector: 'app-covoiturage-card',
  templateUrl: './covoiturage-card.component.html',
  styleUrls: ['./covoiturage-card.component.scss']
})
export class CovoiturageCardComponent {
  @Input({ required: true }) offreCovoiturage!: OffreCovoiturageCardData;

  getTrajetInfo() {
    const lieuCovoiturage = this.offreCovoiturage.pointPassagePlusProche?.lieuCovoiturage;

    return [
      {
        adresse: `${lieuCovoiturage?.adresse} ${lieuCovoiturage?.commune.nom} ${lieuCovoiturage?.commune.codePostal}`,
        date: '09:30'
      },
      {
        adresse: 'Mulhouse',
        date: '20:00'
      }
    ];
  }
}
