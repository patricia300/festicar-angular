import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CovoituragePageComponent } from './pages/covoiturage-page/covoiturage-page.component';
import { FestivalPageComponent } from './pages/festival-page/festival-page.component';
import { PanierPageComponent } from './pages/panier-page/panier-page.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'festivals', component:  FestivalPageComponent },
    { path: 'panier', component: PanierPageComponent },
    { path: 'covoiturages/:qte/:idFestival', component: CovoituragePageComponent },
    { path: '', redirectTo: '/festivals', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent } // Wildcard for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
