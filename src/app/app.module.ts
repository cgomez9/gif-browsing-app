import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { AlertService, MessageService } from '@/_services';
import { AlertComponent } from '@/_components';
import { NavbarComponent } from './navbar';
import { SearchResultComponent } from './search-result';
import { CoreService } from './_services/core.service';
import { HistoryComponent } from './history/history.component';
import { FavoriteComponent } from './favorite/favorite.component';

import { LightboxModule } from 'ngx-lightbox';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        LightboxModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent,
        NavbarComponent,
        SearchResultComponent,
        HistoryComponent,
        FavoriteComponent,
    ],
    providers: [
        AlertService, 
        MessageService,
        CoreService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
