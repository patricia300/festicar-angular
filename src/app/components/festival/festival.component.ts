import { Component, Input } from '@angular/core';
import { Festival } from 'src/app/interfaces/festival';
import { PointPassageCovoiturages } from 'src/app/interfaces/point-passage-covoiturages';

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.scss']
})
export class FestivalComponent {
  @Input({required: true}) festival!: Festival;

  selectedPointPassage?: PointPassageCovoiturages = undefined;

  getRemainingSeats(): number {
    let total = 0;
    this.festival.offreCovoiturages.forEach((offre) => {
      total += offre.nombrePlaces;
    })

    return total;
  }
}
