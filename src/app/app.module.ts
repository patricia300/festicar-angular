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
import { FestivalPageComponent } from './pages/festival-page/festival-page.component';
import { FestivalCardComponent } from './components/festival-card/festival-card.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { CommuneInputComponent } from './components/commune-input/commune-input.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DialogModule } from 'primeng/dialog';
import { FooterActionComponent } from './components/footer-action/footer-action.component';

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
    FestivalPageComponent,
    FestivalCardComponent,
    CommuneInputComponent,
    TruncatePipe,
    FooterActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    MenuModule,
    InputNumberModule,
    AvatarGroupModule,
    AvatarModule,
    CardModule,
    TimelineModule,
    ButtonModule,
    AccordionModule,
    DividerModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    DialogModule
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
