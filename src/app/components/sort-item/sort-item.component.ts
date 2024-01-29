import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.scss']
})
export class SortItemComponent {
  @Input() label!: string;
  @Input() iconClass!: string;
}
