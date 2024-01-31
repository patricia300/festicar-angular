import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private auth: AuthService,
              private router: Router ){}

  authenticateWithGoogle(){
    this.auth.googleSignin();
  }

  authenticateWithFacebook(){
    this.auth.facebookSignin;
  }
}
