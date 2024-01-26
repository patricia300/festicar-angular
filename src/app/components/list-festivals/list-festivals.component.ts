import { Component, OnInit } from '@angular/core';
import { Festival } from 'src/app/interfaces/festival';
import { Pageable } from 'src/app/interfaces/pageable';
import { FestivalsService } from 'src/app/services/festivals.service';

@Component({
  selector: 'app-list-festivals',
  templateUrl: './list-festivals.component.html',
  styleUrls: ['./list-festivals.component.scss']
})
export class ListFestivalsComponent implements OnInit {
  festivals: Festival[] = [];
  pageFestival?: Pageable<Festival>;
  festivalsIsLoading: boolean = false;

  constructor(private festivalsService: FestivalsService){}

  ngOnInit(): void {
    this.festivalsIsLoading = true;

    this.festivalsService.getAll().subscribe((pageFestival: Pageable<Festival>) => {
      this.pageFestival = pageFestival;
      this.festivals = pageFestival.content;
      this.festivalsIsLoading = false;
      window.scroll(0, 0);
    });
  }

  getTotalPages(): number {
    return this.pageFestival?.totalPages || 0;
  }

  onPaginationUpdated(currentPage: number) {
    console.log('paginationUpdated', currentPage);

    this.festivalsIsLoading = true;
    this.festivalsService.getAll(currentPage).subscribe((pageFestival: Pageable<Festival>) => {
      this.pageFestival = pageFestival;
      this.festivals = pageFestival.content;
      this.festivalsIsLoading = false;
      window.scroll(0, 0);
      console.log("festivals : ", this.pageFestival);
    });
  }

}
