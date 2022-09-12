import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { MenuComponent } from './helpers/menu/components/menu/menu.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { NgbDateCustomParserFormatter } from './helpers/datepicker/ngb-date-custom-parser-formatter';

import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


//import { PdfmakeModule } from 'ng-pdf-make';

import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from './helpers/menu/menu.module';
registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    ClientesModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MenuModule
  ],
  providers: [
    AuthGuard,
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'es-*' },
    // {provide: LOCALE_ID, useValue: 'es'},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
