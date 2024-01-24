import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PanierPageComponent } from './panier-page/panier-page.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'panier', component: PanierPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
