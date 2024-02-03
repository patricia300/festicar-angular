import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';


import * as fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovoituragePageComponent } from './pages/covoiturage-page/covoiturage-page.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { ConfirmationService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PanierPageComponent } from './pages/panier-page/panier-page.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { Paginator, PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationComponent,
    CovoituragePageComponent,
    SortItemComponent,
    CovoiturageCardComponent,
    FestivalPageComponent,
    FestivalCardComponent,
    CommuneInputComponent,
    TruncatePipe,
    FooterActionComponent,
    PanierPageComponent,
    ArticleCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
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
    MenuModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    DialogModule,
    BadgeModule,
    ToastrModule.forRoot(),
    CommonModule,
    CheckboxModule,
    ConfirmDialogModule,
    TabViewModule,
    PaginatorModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    ConfirmationService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
