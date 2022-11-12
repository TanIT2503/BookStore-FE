import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookstoreRoutingModule } from './bookstore-routing.module';
import { DetailBookComponent } from './detail-book/detail-book.component';


@NgModule({
  declarations: [DetailBookComponent],
  imports: [
    CommonModule,
    BookstoreRoutingModule
  ]
})
export class BookstoreModule { }
