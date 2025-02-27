import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COMMUNE, DATE_DEBUT, DOMAINE, Festival } from 'src/app/interfaces/festival';
import { PageEvent } from 'src/app/interfaces/page-event';
import { AuthService } from 'src/app/services/authService/auth.service';
import { DomaineService } from 'src/app/services/domaine.service';
import { FestivalsService } from 'src/app/services/festivals.service';
import { PanierService } from 'src/app/services/panier.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilisateurService } from 'src/app/services/utilisateurService/utilisateur.service';

@Component({
  selector: 'app-festival-page',
  templateUrl: './festival-page.component.html',
  styleUrls: ['./festival-page.component.scss']
})
export class FestivalPageComponent implements OnInit {
  modalFestivalIsVisible: boolean = false;
  modalConnexionIsVisible: boolean = false;
  qtePass: number = 1;

  festivalSearchValue: string = '';

  filterOptions: string[] = [COMMUNE, DATE_DEBUT, DOMAINE];
  selectedFilterOption: string = '';
  communeFilterValue: string = '';
  dateDebutFilterValue: string = '';
  domaineFilterValue: string = '';
  showPaginator: boolean = false;

  constructor(
    protected festivalsService: FestivalsService,
    private authService: AuthService,
    private toastService: ToastService,
    private utilisateurService: UtilisateurService,
    private panierService: PanierService,
    protected domaineService: DomaineService,
    private router: Router){}

  ngOnInit(): void {
    this.festivalsService.getAll(this.festivalsService.pagination.page, this.festivalsService.pagination.rows).subscribe({
      next: () => this.showPaginator = true,
      error: () => this.toastService.showError('Echec lors de la récupération des festivals')
    });

    this.domaineService.getAllDomainePrincipals().subscribe({
      error: () => this.toastService.showError('Echec lors de la récupération des domaines principals')
    })

    if(this.utilisateurService.utilisateur) {
      this.panierService.getCurrentPanier(this.utilisateurService.utilisateur.email).subscribe();
    }
  }

  getFestivalByName() {
    if(this.festivalSearchValue) {
      this.festivalsService.getAllByName(this.festivalSearchValue).subscribe({
        next: (festivals) => {
          this.showPaginator = false;
          if(festivals.length < 1) this.toastService.showInfo('Aucun festival ne correspond à votre recherche');
        },
        error: () => this.toastService.showError('Echec lors de la récupération des festivals')
      });
    }
  }

  showFestivalDetails() {
    this.modalFestivalIsVisible = true;
  }

  showConnexionModal() {
    this.modalConnexionIsVisible = true;
  }

  onConnected() {
    this.modalConnexionIsVisible = false;
    this.showFestivalDetails();
  }

  onAcheterPassFestival(festival: Festival) {
    this.festivalsService.selectedFestival = festival;
    if(this.authService.isAuthenticated()) {
      this.showFestivalDetails();
    } else {
      this.showConnexionModal();
    }
  }

  onAjouterAuPanier() {
    console.log("qté de passe au panier : ", this.qtePass);
    this.router.navigateByUrl(`covoiturages/${this.qtePass}/${this.festivalsService.selectedFestival?.id}`);
  }

  filterByCommune() {
    if(this.communeFilterValue) {
      this.festivalsService.getAllFestivalsByCommune(this.communeFilterValue).subscribe({
        next: (festivals) => {
          this.showPaginator = false;
          if(festivals.length < 1) this.toastService.showInfo('Aucun festival ne correspond à votre filtre');
        },
        error: () => this.toastService.showError('Echec lors de la récupération des festivals')
      });
    }
  }

  onSelectCommune(codeInsee: string) {
    this.communeFilterValue = codeInsee;
  }

  filterByDateDebut() {
    if(this.dateDebutFilterValue) {
      this.festivalsService.getAllFestivalsByDate(this.dateDebutFilterValue).subscribe({
        next: (festivals) => {
          this.showPaginator = false;
          if(festivals.length < 1) this.toastService.showInfo('Aucun festival ne correspond à votre filtre');
        },
        error: () => this.toastService.showError('Echec lors de la récupération des festivals')
      });
    }
  }

  filterByDomaine() {
    if(this.domaineFilterValue) {
      this.festivalsService.getAllFestivalsByDomaine(this.domaineFilterValue).subscribe({
        next: (festivals) => {
          this.showPaginator = false;
          if(festivals.length < 1) this.toastService.showInfo('Aucun festival ne correspond à votre filtre');
        },
        error: () => this.toastService.showError('Echec lors de la récupération des festivals')
      });
    }
  }

  showCommuneFilter(): boolean {
    return this.selectedFilterOption === COMMUNE;
  }

  showDateDebutFilter(): boolean {
    return this.selectedFilterOption === DATE_DEBUT;
  }

  showDomaineFilter(): boolean {
    return this.selectedFilterOption === DOMAINE;
  }

  onPageChange(event: any) {
    this.festivalsService.pagination = <PageEvent>event;
    this.festivalsService.getAll(this.festivalsService.pagination.page, this.festivalsService.pagination.rows).subscribe(() => {
      window.scroll(0,0);
    });
  }

  reinitialiserFestivals() {
    this.festivalSearchValue = '';
    this.selectedFilterOption = '';
    this.communeFilterValue = '';
    this.dateDebutFilterValue = '';
    this.domaineFilterValue = '';

    this.festivalsService.pagination.page = 0;
    this.festivalsService.getAll(this.festivalsService.pagination.page, this.festivalsService.pagination.rows).subscribe({
      next: () => {
        this.showPaginator = true;
        window.scroll(0,0);
      },
      error: () => this.toastService.showError('Echec lors de la récupération des festivals')
    });
  }
}
