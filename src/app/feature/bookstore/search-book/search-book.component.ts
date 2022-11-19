import { Component, OnInit } from '@angular/core';
import {IBook} from '../../../model/book/ibook';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  bookList: IBook[] = [];
  page = 1;
  size: number;
  key: string;
  theTotalElements: number;
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.key = param.get('searchKey');
      this.searchBook(this.key, this.page);
    });
  }

  searchBook(key: string, page: number) {
    this.page = page;
    this.bookService.searchBook(key, this.page - 1).subscribe((data: any) => {
          this.bookList = data.content;
          this.size = data.size;
          this.theTotalElements = data.totalElements;
        },
        () => {
          this.page--;
          this.searchBook(key, this.page);
        },
        () => {
        }
    );
  }
}
