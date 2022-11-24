import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { ListBookComponent } from './feature/bookstore/list-book/list-book.component';
import { BillboardComponent } from './share/home/billboard/billboard.component';
import { FeaturedBooksComponent } from './share/home/featured-books/featured-books.component';
import { BestSellingComponent } from './share/home/best-selling/best-selling.component';
import { PopularBooksComponent } from './share/home/popular-books/popular-books.component';
import { QuotationComponent } from './share/home/quotation/quotation.component';
import { SpecialOfferComponent } from './share/home/special-offer/special-offer.component';
import { SubscribeComponent } from './share/home/subscribe/subscribe.component';
import { IndexComponent } from './share/home/index/index.component';
import {AccountModule} from './feature/account/account.module';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgGoogleOneTapModule } from 'ng-google-one-tap';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {NgxPaginationModule} from 'ngx-pagination';
import { BookCartComponent } from './feature/cart/book-cart/book-cart.component';
import {NotifierModule} from 'angular-notifier';
import {NgxNotificationModule} from '@flywine93/ngx-notification';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ListBookComponent,
        BillboardComponent,
        FeaturedBooksComponent,
        BestSellingComponent,
        PopularBooksComponent,
        QuotationComponent,
        SpecialOfferComponent,
        SubscribeComponent,
        IndexComponent,
        BookCartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AccountModule,
        HttpClientModule,
        NotifierModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        NgGoogleOneTapModule.config(
            {
                client_id: environment.clientId,
                cancel_on_tap_outside: false,
                authvalidate_by_googleapis: false,
                auto_select: false,
                disable_exponential_cooldowntime: false,
                context: 'signup',
            }
        ),
        NgxPaginationModule,
        FormsModule,
        NgxNotificationModule,
        BrowserAnimationsModule
    ],
    providers: [HeaderComponent, authInterceptorProviders,
        JwtHelperService,
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        { provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
