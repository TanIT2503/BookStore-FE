import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookstoreRoutingModule } from './bookstore-routing.module';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { ListCategoryBookComponent } from './list-category-book/list-category-book.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchBookComponent } from './search-book/search-book.component';
import { PromotionsBookComponent } from './promotions-book/promotions-book.component';


@NgModule({
  declarations: [DetailBookComponent, ListCategoryBookComponent, SearchBookComponent, PromotionsBookComponent],
  imports: [
    CommonModule,
    BookstoreRoutingModule,
    NgxPaginationModule
  ]
})
export class BookstoreModule { }
