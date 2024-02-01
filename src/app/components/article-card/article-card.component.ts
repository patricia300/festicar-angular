import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleCard } from 'src/app/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input({required: true}) article!: ArticleCard;
  @Output() supprimer = new EventEmitter<number>();


  calcTotalArticlePrice(): number {
    return this.article.quantite * (this.article.festival.tarifPass + (this.article.pointPassageCovoiturage?.prix || 0));
  }

  supprimerArticle() {
    this.supprimer.emit(this.article.id);
  }

  getTrajetInfo() {
    const lieuCovoiturage = this.article.pointPassageCovoiturage?.lieuCovoiturage;

    return [
      {
        adresse: `${lieuCovoiturage?.adresse} ${lieuCovoiturage?.commune.nom}, ${lieuCovoiturage?.commune.codePostal}`,
        date: '09:30'
      },
      {
        adresse: this.article.festival.nomCommune,
        date: '20:00'
      }
    ];
  }
}
