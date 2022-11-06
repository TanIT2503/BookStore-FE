import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { CreateAccountComponent } from './feature/account/create-account/create-account.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateAccountComponent,
    ListBookComponent,
    BillboardComponent,
    FeaturedBooksComponent,
    BestSellingComponent,
    PopularBooksComponent,
    QuotationComponent,
    SpecialOfferComponent,
    SubscribeComponent,
    IndexComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AccountModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
