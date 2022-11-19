import { Component, OnInit } from '@angular/core';
import {IBook} from '../../../model/book/ibook';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {
  book: IBook;
  id: number;
  bookListByAuthor: IBook[] = [];
  promotionPrice: number;
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getBook(this.id);
    });
  }
  getBook(id: number) {
    return this.bookService.getBookById(id).subscribe((book) => {
      this.book = book;
    });
  }
  ngOnInit(): void {
  }

}
