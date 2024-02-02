import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommuneSearchItem } from 'src/app/interfaces/commune';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CommuneService } from 'src/app/services/commune.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    protected panierService: PanierService,
    protected authService: AuthService,
    private confirmDialogService: ConfirmDialogService) {}

  ngOnInit() {
    if(this.authService.isAuthenticated() && this.authService.userEmail) {
      this.panierService.getCurrentPanier(this.authService.userEmail).subscribe();
    }
  }

  authenticateWithGoogle(){
    this.authService.googleSignin();
  }

  seDeconnecter() {
    this.confirmDialogService.confirm(
      'Se déconnecter',
      'Voulez-vous vraiment vous déconnecter?',
      () => this.authService.signOut()
    );
  }
}
