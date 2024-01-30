import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AjoutArcticle } from 'src/app/interfaces/article';
import { Festival } from 'src/app/interfaces/festival';
import { OffreCovoiturageCardData } from 'src/app/interfaces/offre-covoiturage';

@Component({
  selector: 'app-covoiturage-card',
  templateUrl: './covoiturage-card.component.html',
  styleUrls: ['./covoiturage-card.component.scss']
})
export class CovoiturageCardComponent {
  @Input({ required: true }) offreCovoiturage!: OffreCovoiturageCardData;
  @Input({ required: true }) festival?: Festival;
  @Output() reserverPlace = new EventEmitter<AjoutArcticle>();

  nbPlacePrise: number = 0;

  getTrajetInfo() {
    const lieuCovoiturage = this.offreCovoiturage.pointPassagePlusProche?.lieuCovoiturage;

    return [
      {
        adresse: `${lieuCovoiturage?.adresse} ${lieuCovoiturage?.commune.nom} ${lieuCovoiturage?.commune.codePostal}`,
        date: '09:30'
      },
      {
        adresse: this.festival?.nomCommune,
        date: '20:00'
      }
    ];
  }

  onChangeNbPlacePrise() {
    if(this.offreCovoiturage.pointPassagePlusProche) {
      const article: AjoutArcticle = {
        idPointPassage: this.offreCovoiturage.pointPassagePlusProche?.id,
        quantite: this.nbPlacePrise
      }

      this.reserverPlace.emit(article);
    }
  }
}
