import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { StatutPanier } from 'src/app/enums/statut-panier';
import { Article, ArticleCard } from 'src/app/interfaces/article';
import { ClassTypePaymentResponse, Panier, PanierPayesListing, PaymentResponse } from 'src/app/interfaces/panier';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { PanierService } from 'src/app/services/panier.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-panier-page',
  templateUrl: './panier-page.component.html',
  styleUrls: ['./panier-page.component.scss']
})
export class PanierPageComponent {
  articles: ArticleCard[] = [];
  paniersPayes: PanierPayesListing[] = [];

  modalIndisponibleIsVisible: boolean = false;
  articlesDisponiblesRestants: ArticleCard[] = [];

  constructor(
    protected panierService: PanierService,
    private toastService: ToastService,
    private confirmDialogService: ConfirmDialogService,
    private authService: AuthService,
    private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.populateArticles();
    this.populatePaymentHistory();
  }

  populatePaymentHistory() {
    if(this.authService.userEmail) {
      this.panierService.getAll(this.authService.userEmail).subscribe({
        next: (panierResponse) => {
          this.paniersPayes = panierResponse.map(p => {
            return ({
              panier: p.panier,
              articles: p.articles.map((a) => this.mapArticle(<Article>a))
            });
          })
        },
        error: () => this.toastService.showError('Echec de la récupération des paniers')
      });
    } else {
      this.toastService.showError('Email utilisateur non récupéré');
    }
  }

  supprimerArticle(idArticle: number) {
    console.log('suppression article : ', idArticle);
    const selectedArticle = this.articles.find(a => a.id === idArticle);

    this.confirmDialogService.confirm(
      "Suppression d'un article",
      ` Voulez-vous vraiment procédez à la suppression de <b>${selectedArticle?.quantite} ticket(s)</b>
        pour le festival <b>${selectedArticle?.festival.nom}</b> ?
      `,
      () => this.panierService.supprimerArticle(idArticle).subscribe({
        next: () => {
          this.toastService.showSuccess('Suppression réussie');
          this.populateArticles();
          this.populatePaymentHistory();
        },
        error: () => this.toastService.showError('Echec de la suppression')
      })
    );
  }

  validerPanierArticlesRestants() {

  }

  validerPanier() {
    const selectedArticles = this.articles.filter(a => a.checked);

    if(selectedArticles.length < 1) {
      // payer tout le panier
      this.confirmDialogService.confirm(
        'Paiement du panier',
        `Vous allez payer un montant de ${this.currencyPipe.transform(this.getTotalAmount(), 'EUR')}`,
        () => {
          if(this.panierService.currentPanier) {
            this.panierService.payerPanier(this.panierService.currentPanier.id).subscribe({
              next: (res: PaymentResponse) => {
                if(!res.articlesNonDisponible) {
                  // Paiement réussi
                  this.toastService.showSuccess('Paiement réussi');
                } else {
                  res.articlesNonDisponible.forEach(articleNonDispo => {
                    const foundIdx = this.articles.findIndex(a => a.id === articleNonDispo.id);
                    switch(articleNonDispo.classType) {
                      case ClassTypePaymentResponse.FESTIVAL:
                        if(foundIdx >  -1) this.panierService.supprimerArticle(this.articles[foundIdx].id).subscribe();
                        break;
                      case ClassTypePaymentResponse.OFFRE_COVOITURAGE:
                        if(articleNonDispo.nbPassDisponible > 0) {
                          this.articles[foundIdx].quantite = articleNonDispo.nbPassDisponible;
                        } else {
                          if(foundIdx > -1) this.panierService.supprimerArticle(this.articles[foundIdx].id).subscribe();
                        }
                        break;
                      default:
                        break;
                    }
                  });

                  this.articlesDisponiblesRestants = this.articles;
                  this.modalIndisponibleIsVisible = true;
                }

                this.populateArticles();
                this.populatePaymentHistory();
              },
              error: () => this.toastService.showError('Echec du paiement')
            });
          }
        }
      );
    } else {
      // payer les articles sélectionnés
      this.confirmDialogService.confirm(
        'Paiement partiel du panier',
        `Vous allez payer un montant de ${this.currencyPipe.transform(this.getTotalAmount(), 'EUR')}`,
        () => {
          const paymentPayload = {
            emailFestivalier: this.authService.userEmail || '',
            articles: selectedArticles.map(a => a.id)
          }
          this.panierService.paiementPartiel(paymentPayload).subscribe({
            next: (res: PaymentResponse) => {
              if(!res.articlesNonDisponible) {
                // Paiement réussi
                this.toastService.showSuccess('Paiement réussi');
                this.populateArticles();
              } else {
                this.modalIndisponibleIsVisible = true;
                res.articlesNonDisponible.forEach(articleNonDispo => {
                  const found = this.articles.find(a => a.id === articleNonDispo.id);
                  switch(articleNonDispo.classType) {
                    case ClassTypePaymentResponse.FESTIVAL:
                      if(found) {
                        this.panierService.supprimerArticle(found.id).subscribe();
                        paymentPayload.articles = paymentPayload.articles.filter(idArticle => idArticle !== found.id)
                      }
                      break;
                    case ClassTypePaymentResponse.OFFRE_COVOITURAGE:
                      if(found) {
                        this.panierService.supprimerArticle(found.id).subscribe();
                        paymentPayload.articles = paymentPayload.articles.filter(idArticle => idArticle !== found.id)
                      }
                      // if(articleNonDispo.nbPassDisponible > 0) {
                      //   // TODO: Gros soucis
                      //   if(found) {
                      //     const foundIdx = this.articles.findIndex(a => a.id === found.id);
                      //     if(foundIdx > -1) this.articles[foundIdx].quantite = articleNonDispo.nbPassDisponible;
                      //   }
                      // } else {
                      //   if(found) {
                      //     this.panierService.supprimerArticle(found.id).subscribe();
                      //     paymentPayload.articles = paymentPayload.articles.filter(idArticle => idArticle !== found.id)
                      //   }
                      // }
                      break;
                    default:
                      break;
                  }
                });
              }
              this.articlesDisponiblesRestants = [];
              paymentPayload.articles.forEach(payloadIdArticle => {
                const found = this.articles.find(articl => articl.id === payloadIdArticle);
                if(found) this.articlesDisponiblesRestants.push();
              });

              this.populatePaymentHistory();
            },
            error: () => this.toastService.showError('Echec du paiement')
          })
        }
      );
    }
  }

  getTotalAmount(): number {
    let amount = 0;
    const selectedArticles = this.articles.filter(a => a.checked);

    if(selectedArticles.length > 0) {
      selectedArticles.forEach(article => {
        amount += article.totalPrix;
      });
    } else {
      this.articles.forEach(article => {
        amount += article.totalPrix;
      });
    }

    return amount;
  }

  getButtonText(): string {
    const selectedArticleCount = this.articles.filter(a => a.checked).length;

    return selectedArticleCount > 0 ?
       `Payer ${selectedArticleCount} article(s) selectionné(s) : ${this.currencyPipe.transform(this.getTotalAmount(), 'EUR')}` :
       `Payer tout le panier : ${this.currencyPipe.transform(this.getTotalAmount(), 'EUR')}`
  }

  getIndisponibleButtonText(): string {
    return `Payer les tickets disponibles : ${this.currencyPipe.transform(this.getTotalAmount(), 'EUR')}`
  }

  footerIsHidden(): boolean {
    return this.articles.length < 1;
  }

  populateArticles() {
    if(this.authService.userEmail) {
      this.panierService.getCurrentPanier(this.authService.userEmail).subscribe({
        next: (panier) => this.articles = panier.articles.map((a) => this.mapArticle(a)),
        error: () => this.toastService.showError('Echec de la récuperation du panier courant')
      });
    } else {
      this.toastService.showError('Email utilisateur non récupéré');
    }
  }

  private mapArticle(a: Article): ArticleCard {
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
      offreCovoiturage,
      totalPrix: quantite * (festival.tarifPass + (pointPassageCovoiturage?.prix || 0))
    });
  }
}
