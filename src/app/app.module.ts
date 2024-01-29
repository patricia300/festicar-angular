import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FestivalFinderComponent } from './components/festival-finder/festival-finder.component';
import { ListFestivalsComponent } from './components/list-festivals/list-festivals.component';
import { FestivalComponent } from './components/festival/festival.component';
import { PanierPageComponent } from './components/panier-page/panier-page.component';
import { PanierModifierComponent } from './components/panier-modifier/panier-modifier.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { ArticleComponent } from './components/article/article.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { registerLocaleData } from '@angular/common';

import * as fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovoituragePageComponent } from './pages/covoiturage-page/covoiturage-page.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { SortItemComponent } from './components/sort-item/sort-item.component';
import { CovoiturageCardComponent } from './components/covoiturage-card/covoiturage-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FestivalFinderComponent,
    ListFestivalsComponent,
    FestivalComponent,
    PanierPageComponent,
    PanierModifierComponent,
    ListArticlesComponent,
    ArticleComponent,
    PaginationComponent,
    CovoituragePageComponent,
    SortItemComponent,
    CovoiturageCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    MenuModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
