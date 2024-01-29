import { Component, Input, OnInit } from '@angular/core';
import { OffreCovoiturageCardData } from 'src/app/interfaces/offre-covoiturage';
import { OffreCovoiturageService } from 'src/app/services/offre-covoiturage.service';
@Component({
  selector: 'app-covoiturage-page',
  templateUrl: './covoiturage-page.component.html',
  styleUrls: ['./covoiturage-page.component.scss']
})
export class CovoituragePageComponent implements OnInit {
  offreCovoiturages: OffreCovoiturageCardData[] = [];

  constructor(private offreCovoiturageService: OffreCovoiturageService) {}

  ngOnInit(): void {
    const JUST_FOR_EXAMPLE = 1019;
    this.offreCovoiturageService.getOffreCovoiturageByFestival(JUST_FOR_EXAMPLE).subscribe(offres => {
      this.offreCovoiturages = offres.map(o => {
        return ({
          ...o,
          pointPassagePlusProche: o.pointPassageCovoiturages.length > 0 ? o.pointPassageCovoiturages[0] : undefined
        });
      })
      console.log('offreCovoiturages :', this.offreCovoiturages);
    })
  }
}
