import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PanierPageComponent } from './components/panier-page/panier-page.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'panier', component: PanierPageComponent },
    { path: 'authentication', component: AuthenticationComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
