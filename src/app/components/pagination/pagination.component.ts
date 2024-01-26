import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages: number = 0;
  @Output() update = new EventEmitter<number>();

  currentPage: number = 1;
  paginationItems: number[] = [];
  displayedItems: number[] = [];

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    for(let i = 1; i <= this.totalPages; i++) {
      this.paginationItems.push(i);
    }

    this.updateDisplayItems();
  }

  makeDisplayedItems() {
    let min = this.currentPage - 3;
    let max = this.currentPage + 3;

    if(min <= 0) max += Math.abs(min) + 1;
    if(max > this.totalPages) min -= max - this.totalPages;

    const minIdx = min-1 < 0 ? 0 : min-1;
    const maxIdx = max > this.totalPages ? this.totalPages : max;

    return this.paginationItems.slice(minIdx, maxIdx);
  }

  updateDisplayItems() {
    this.displayedItems = this.makeDisplayedItems();
  }

  setCurrentPage(page: number)  {
    this.currentPage = page;
    this.update.emit(this.currentPage);
    this.updateDisplayItems();
  }

  getLastDisplayedItems() {
    if(this.displayedItems.length == 0) return 0;
    return this.displayedItems[this.displayedItems.length-1];
  }

  getFirstDisplayedItems() {
    if(this.displayedItems.length == 0) return -1;
    return this.displayedItems[0];
  }

  next() {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.update.emit(this.currentPage);
      this.updateDisplayItems();
    }
  }

  previous() {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.update.emit(this.currentPage);
      this.updateDisplayItems();
    }
  }
}
