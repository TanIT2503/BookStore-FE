import { NgModule } from '@angular/core';

import { BookstoreRoutingModule } from './bookstore-routing.module';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { ListCategoryBookComponent } from './list-category-book/list-category-book.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchBookComponent } from './search-book/search-book.component';
import { PromotionsBookComponent } from './promotions-book/promotions-book.component';
import {NgxNotificationModule} from '@flywine93/ngx-notification';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [DetailBookComponent, ListCategoryBookComponent, SearchBookComponent, PromotionsBookComponent],
    imports: [
        BookstoreRoutingModule,
        NgxPaginationModule,
        CommonModule,
    ]
})
export class BookstoreModule { }
