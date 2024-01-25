import { Component, OnInit } from '@angular/core';
import { FestivalsService } from './services/festivals.service';
import { Festival } from './interfaces/festival';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  festivals: Festival[] = [];

  constructor(private festivalsService: FestivalsService) {}

  ngOnInit(): void {
    this.festivalsService.getAll().subscribe(festivals => {
      this.festivals = festivals;
      console.log("festivals : ", this.festivals);
    });
  }
}
