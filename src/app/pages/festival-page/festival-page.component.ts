import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Festival } from 'src/app/interfaces/festival';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FestivalsService } from 'src/app/services/festivals.service';

@Component({
  selector: 'app-festival-page',
  templateUrl: './festival-page.component.html',
  styleUrls: ['./festival-page.component.scss']
})
export class FestivalPageComponent implements OnInit {
  modalFestivalIsVisible: boolean = false;
  modalConnexionIsVisible: boolean = false;
  qtePass: number = 1;

  constructor(
    protected festivalsService: FestivalsService,
    private authService: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.festivalsService.getAll().subscribe();
  }

  showFestivalDetails() {
    this.modalFestivalIsVisible = true;
  }

  showConnexionModal() {
    this.modalConnexionIsVisible = true;
  }

  onAcheterPassFestival(festival: Festival) {
    if(this.authService.isAuthenticated()) {
      this.festivalsService.selectedFestival = festival;
      this.showFestivalDetails();
    } else {
      this.showConnexionModal();
    }
  }

  onAjouterAuPanier() {

      console.log("qté de passe au panier : ", this.qtePass);
      this.router.navigateByUrl(`covoiturages/${this.qtePass}/${this.festivalsService.selectedFestival?.id}`);
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const scrollTop: number = window.scrollY;
    const visibleHeight: number = window.innerHeight;
    const totalHeight: number = document.documentElement.scrollHeight;

    if (scrollTop + visibleHeight >= totalHeight) {
      console.log('Le défilement est au plus bas.');
      const currentPage = this.festivalsService.currentPageable?.number;
      if(currentPage != undefined) {
        this.festivalsService.getAll(currentPage + 1).subscribe()
      }
    }
  }

}
