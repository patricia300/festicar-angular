import { Component, Input } from '@angular/core';
import { Festival } from 'src/app/interfaces/festival';

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.scss']
})
export class FestivalComponent {
  @Input({required: true}) festival!: Festival;
}
