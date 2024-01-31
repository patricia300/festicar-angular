import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AjoutArcticle } from 'src/app/interfaces/article';
import { OffreCovoiturageCardData } from 'src/app/interfaces/offre-covoiturage';
import { PanierRequestBodyDto } from 'src/app/interfaces/panier-request-body-dto';
import { FestivalsService } from 'src/app/services/festivals.service';
import { OffreCovoiturageService } from 'src/app/services/offre-covoiturage.service';
import { PanierService } from 'src/app/services/panier.service';
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
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initCurrentFestival();
    this.initQtePass();
  }

  initQtePass() {
    this.offreCovoiturageService.initQtePass(this.route.snapshot.params['qte']);
  }

  initCurrentFestival() {
    const idFestival = this.route.snapshot.params['idFestival'];
    this.offreCovoiturageService.initCurrentFestival(idFestival).subscribe();
  }

  addArticlesAuPanier() {
    const data: PanierRequestBodyDto = {
      emailFestivalier: 'lucie.deschamps@gmail.com',
      articles: this.reservations
    }

    this.panierService.postPanier(data).subscribe();
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

    console.log('reservations : ', this.reservations);
  }
}
