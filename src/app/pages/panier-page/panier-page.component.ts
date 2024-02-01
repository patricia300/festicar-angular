import { Component } from '@angular/core';
import { ArticleCard } from 'src/app/interfaces/article';
import { Festival } from 'src/app/interfaces/festival';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier-page',
  templateUrl: './panier-page.component.html',
  styleUrls: ['./panier-page.component.scss']
})
export class PanierPageComponent {
  articles: ArticleCard[] = [];

  constructor(
    protected panierService: PanierService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.populateArticles();
  }

  supprimerArticle(idArticle: number) {
    console.log('suppression article : ', idArticle);
  }

  validerPanier() {
    const selectedArticles = this.articles.filter(a => a.checked);

    if(selectedArticles.length < 1) {
      // payer tout le panier
      console.log('Payer tout le panier : ', this.articles);
    } else {
      // payer les articles sélectionnés
      console.log('Payer les articles sélectionnés :', selectedArticles);
    }
  }

  getButtonText(): string {
    const selectedArticleCount = this.articles.filter(a => a.checked).length;
    return this.articles.filter(a => a.checked).length > 0 ? `Payer ${selectedArticleCount} article(s) selectionné(s)` : 'Payer tout le panier'
  }

  populateArticles() {
    if(this.authService.userEmail) {
      this.panierService.getCurrentPanier(this.authService.userEmail).subscribe((panier) => {

        this.articles = panier.articles.map((a) => {
          const offreCovoiturage = a.festival.offreCovoiturages.length > 0 ? a.festival.offreCovoiturages[0] : undefined;

          if(offreCovoiturage) {
            offreCovoiturage.covoitureur.urlPhoto = `https://picsum.photos/200?random=${Math.random()}`;
          }

          const pointPassageCovoiturage =
            offreCovoiturage?.pointPassageCovoiturages.length ?
            (offreCovoiturage.pointPassageCovoiturages.length > 0 ? offreCovoiturage.pointPassageCovoiturages[0] : undefined)
            : undefined;

          const { id, festival, quantite } = a;

          return ({
            id,
            quantite,
            festival,
            pointPassageCovoiturage,
            offreCovoiturage
          });
        })
      });
    }
  }
}
