import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HistoryComponent } from './history';
import { FavoriteComponent } from './favorite';
import { NavbarComponent } from './navbar';
import { SearchResultComponent } from './search-result';
import { AlertComponent } from '@/_components';

import { AlertService, MessageService } from '@/_services';
import { CoreService } from './_services/core.service';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        LightboxModule,
        InfiniteScrollModule
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
