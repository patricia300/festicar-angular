import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PanierPageComponent } from './components/panier-page/panier-page.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CovoituragePageComponent } from './pages/covoiturage-page/covoiturage-page.component';
import { authGuard } from './services/authService/auth.guard';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'panier', component: PanierPageComponent, canActivate: [authGuard] },
    { path: 'authentication', component: AuthenticationComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'covoiturages', component: CovoituragePageComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/covoiturages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
