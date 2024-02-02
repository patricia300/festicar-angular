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
    const dateDepart: Date = new Date(this.offreCovoiturage?.heureDepart || 0);
    const differenceHeurePassage: number = this.offreCovoiturage.pointPassagePlusProche?.differenceHeurePassage || 0;

    return [
      {
        adresse: `${lieuCovoiturage?.adresse} ${lieuCovoiturage?.commune.nom}, ${lieuCovoiturage?.commune.codePostal}`,
        date: dateDepart.setHours(dateDepart.getHours() + differenceHeurePassage)
      },
      {
        adresse: this.festival?.nomCommune,
        date: this.offreCovoiturage.heureArrive
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
