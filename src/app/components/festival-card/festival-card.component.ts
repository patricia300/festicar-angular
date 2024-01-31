import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Festival } from 'src/app/interfaces/festival';

@Component({
  selector: 'app-festival-card',
  templateUrl: './festival-card.component.html',
  styleUrls: ['./festival-card.component.scss']
})
export class FestivalCardComponent {
  @Input() festival!: Festival;
  @Output() acheterPass = new EventEmitter<Festival>() ;

  onAcheterPass() {
    this.acheterPass.emit(this.festival);
  }
}
