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

  constructor(private festivalsService: FestivalsService){}

  ngOnInit(): void {
    this.festivalsService.getAll().subscribe((pageFestival: Pageable<Festival>) => {
      this.pageFestival = pageFestival;
      this.festivals = pageFestival.content;
    });
  }

  getTotalPages(): number {
    return this.pageFestival?.totalPages || 0;
  }

}
