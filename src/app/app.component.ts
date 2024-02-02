import { Component, OnInit } from '@angular/core';
import { CommuneService } from './services/commune.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private communeService: CommuneService) { }

  ngOnInit(): void {
    this.communeService.initData();
  }

}
