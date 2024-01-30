import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreCovoiturageCardData } from 'src/app/interfaces/offre-covoiturage';
import { FestivalsService } from 'src/app/services/festivals.service';
import { OffreCovoiturageService } from 'src/app/services/offre-covoiturage.service';
@Component({
  selector: 'app-covoiturage-page',
  templateUrl: './covoiturage-page.component.html',
  styleUrls: ['./covoiturage-page.component.scss']
})
export class CovoituragePageComponent implements OnInit {
  constructor(
    protected offreCovoiturageService: OffreCovoiturageService,
    private festivalsService: FestivalsService,
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
}
