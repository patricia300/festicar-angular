import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FestivalFinderComponent } from './festival-finder/festival-finder.component';
import { ListFestivalsComponent } from './list-festivals/list-festivals.component';
import { FestivalComponent } from './festival/festival.component';
import { PanierPageComponent } from './panier-page/panier-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FestivalFinderComponent,
    ListFestivalsComponent,
    FestivalComponent,
    PanierPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
