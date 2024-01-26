import { Component, OnInit } from '@angular/core';
import { FestivalsService } from './services/festivals.service';
import { Festival } from './interfaces/festival';
import { Pageable } from './interfaces/pageable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  festivals: Festival[] = [];

  constructor(private festivalsService: FestivalsService) {}

  ngOnInit(): void {
    this.festivalsService.getAll().subscribe((pageFestival: Pageable<Festival>) => {
      this.festivals = pageFestival.content;
      console.log("festivals : ", this.festivals);
    });
  }
}
