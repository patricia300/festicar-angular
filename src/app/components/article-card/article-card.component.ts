import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleCard } from 'src/app/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input({required: true}) article!: ArticleCard;
  @Input() paid: boolean = false;
  @Input() selectable: boolean = true;
  @Input() deletable: boolean = true;
  @Output() supprimer = new EventEmitter<number>();


  calcTotalArticlePrice(): number {
    return this.article.quantite * (this.article.festival.tarifPass + (this.article.pointPassageCovoiturage?.prix || 0));
  }

  supprimerArticle() {
    this.supprimer.emit(this.article.id);
  }

  getTrajetInfo() {
    const lieuCovoiturage = this.article.pointPassageCovoiturage?.lieuCovoiturage;
    const dateDepart: Date = new Date(this.article.offreCovoiturage?.heureDepart || 0);
    const differenceHeurePassage: number = this.article.pointPassageCovoiturage?.differenceHeurePassage || 0;

    return [
      {
        adresse: `${lieuCovoiturage?.adresse} ${lieuCovoiturage?.commune.nom}, ${lieuCovoiturage?.commune.codePostal}`,
        date: dateDepart.setHours(dateDepart.getHours() + differenceHeurePassage)
      },
      {
        adresse: this.article.festival.nomCommune,
        date: this.article.offreCovoiturage?.heureArrive
      }
    ];
  }
}
