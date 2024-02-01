import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer-action',
  templateUrl: './footer-action.component.html',
  styleUrls: ['./footer-action.component.scss']
})
export class FooterActionComponent {
  @Input({required: true}) disabled: boolean = true;
  @Input() buttonText: string = 'ajouter au panier';
  @Output() clickRightButton = new EventEmitter<null>();

  onClickButton() {
    this.clickRightButton.emit();
  }
}
