import { Component, OnInit } from '@angular/core';
import { FestivalsService } from './services/festivals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  constructor(private festivalsService: FestivalsService) {}

  ngOnInit(): void {
    this.festivalsService.getAll().subscribe(festivals => {
      console.log("festivals : ", festivals);
    });
  }
}
