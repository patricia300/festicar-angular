import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  @Output() connected = new EventEmitter<null>();

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private auth: AuthService,
              private router: Router ){}

  authenticateWithGoogle(){
    this.auth.googleSignin().then(
      () => this.connected.emit(null)
    );
  }

  authenticateWithFacebook(){
    this.auth.facebookSignin().then(
      () => this.connected.emit(null)
    );
  }
}
