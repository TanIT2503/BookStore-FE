import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../service/book/book.service';
import {Router} from '@angular/router';
import {IBook} from '../../../model/book/ibook';

@Component({
  selector: 'app-promotions-book',
  templateUrl: './promotions-book.component.html',
  styleUrls: ['./promotions-book.component.css']
})
export class PromotionsBookComponent implements OnInit {
  bookList: IBook[] = [];
  page = 1;
  size: number;
  theTotalElements: number;

  constructor(private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllBookByPromotion(this.page);
  }

  getAllBookByPromotion(page: number) {
    this.page = page;
    this.bookService.getAllBookByPromotion(this.page - 1).subscribe((data: any) => {
          this.bookList = data.content;
          this.size = data.size;
          this.theTotalElements = data.totalElements;
        },
        () => {
          this.page--;
          this.getAllBookByPromotion(this.page);
        },
        () => {
        }
    );
  }
}
