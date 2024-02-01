import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CovoituragePageComponent } from './pages/covoiturage-page/covoiturage-page.component';
import { FestivalPageComponent } from './pages/festival-page/festival-page.component';
import { authGuard } from './services/authService/auth.guard';
import { PanierPageComponent } from './pages/panier-page/panier-page.component';

const routes: Routes = [
    { path: 'festivals', component:  FestivalPageComponent },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'panier', component: PanierPageComponent, canActivate: [authGuard] },
    { path: 'covoiturages/:qte/:idFestival', component: CovoituragePageComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/festivals', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent } // Wildcard for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
