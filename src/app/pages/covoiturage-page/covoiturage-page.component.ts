import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AjoutArcticle } from 'src/app/interfaces/article';
import { PanierRequestBodyDto } from 'src/app/interfaces/panier-request-body-dto';
import { AuthService } from 'src/app/services/authService/auth.service';
import { OffreCovoiturageService } from 'src/app/services/offre-covoiturage.service';
import { PanierService } from 'src/app/services/panier.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-covoiturage-page',
  templateUrl: './covoiturage-page.component.html',
  styleUrls: ['./covoiturage-page.component.scss']
})
export class CovoituragePageComponent implements OnInit {
  reservations: AjoutArcticle[] = [];

  constructor(
    protected offreCovoiturageService: OffreCovoiturageService,
    private panierService: PanierService,
    private toastService: ToastService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.initCurrentFestival();
    this.initQtePass();
    if(this.authService.userEmail) {
      this.panierService.getCurrentPanier(this.authService.userEmail).subscribe();
    }
  }

  initQtePass() {
    this.offreCovoiturageService.initQtePass(this.route.snapshot.params['qte']);
  }

  getQteDisplay(): string {
    let totalQte = 0;

    this.reservations.forEach(r => {
      totalQte += r.quantite;
    });

    return `${totalQte}/${totalQte < this.offreCovoiturageService.qtePass ? this.offreCovoiturageService.qtePass : totalQte}`;
  }

  initCurrentFestival() {
    const idFestival = this.route.snapshot.params['idFestival'];
    this.offreCovoiturageService.initCurrentFestival(idFestival).subscribe({
      error: () => this.toastService.showError('Festival non récupéré')
    });
  }

  addArticlesAuPanier() {
    if(!this.authService.userEmail) this.toastService.showError('Email de utilisateur courant non défini');
    else {
      const data: PanierRequestBodyDto = {
        emailFestivalier: this.authService.userEmail,
        articles: this.reservations
      }
      this.panierService.postPanier(data).subscribe({
        next: () => {
          this.toastService.showInfo('Articles bien ajoutés au panier');
          this.panierService.getCurrentPanier(data.emailFestivalier).subscribe();
          this.router.navigateByUrl('/festivals');
        },
        error: () => this.toastService.showError('Echec ajout au panier')
      });

    }
  }

  reserverPlaceCovoiturage(reservationInfos: AjoutArcticle) {
    const idx = this.reservations.findIndex((r) => r.idPointPassage === reservationInfos.idPointPassage);
    if(idx > -1) {
      // if the booking is already there, just update it
      this.reservations[idx] = reservationInfos;
    } else {
      // if not, add it to the reservation list
      this.reservations.push(reservationInfos);
    }
  }
}
